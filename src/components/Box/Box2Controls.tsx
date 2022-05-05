import { folder, useControls } from "leva";
import { StoreType } from "leva/dist/declarations/src/types";
import { useEffect } from "react";
import { BodyHandles, Position } from "./Box2Handles";

export type Box2ControlsProps = {
    index: number;
    store: StoreType;
    selected: boolean;
    setSelect: ([]: [index: number, store: StoreType]) => void;
};

export function Box2Controls({ index, store, selected, setSelect }: Box2ControlsProps) {

    const [{ position, size, strokeColor, fillColor, fillMode, fillImage, width }, set] = useControls(() => (
        {
            position: { value: [window.innerWidth / 2 - 150, window.innerHeight / 2], step: 1, },
            size: { value: { width: 100, height: 100 }, min: 10, lock: true },

            style: folder({
                fillMode: { value: 'color', options: ['image'] },
                fillColor: { value: '#ff8600', label: 'fill-color', render: (get) => get('style.fillMode') === 'color', },
                fillImage: { image: undefined, label: 'fill image', render: (get) => get('style.fillMode') === 'image', },

                strokeColor: { value: '#555555', label: 'stroke-color' },
                width: { value: 1, min: 0, max: 10, step: 1, label: 'stroke-width' },
            }),
        }),
        { store }
    );

    const _position: Position = [...position, size.width, size.height];

    function setPosition(v: Position) {
        set({ position: [v[0], v[1]], size: { width: v[2], height: v[3], } });
    }

    function setSelected(v: boolean) {
        setSelect([index, store]);
    }

    useEffect(() => {
        setSelect([index, store]);
    }, [index, store, setSelect]);

    return (
        <BodyHandles position={_position} setPosition={setPosition} selected={selected} setSelected={setSelected} />
    );
}

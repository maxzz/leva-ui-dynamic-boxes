import { folder, useControls, useCreateStore } from "leva";
import { StoreType } from "leva/dist/declarations/src/types";
import { useState } from "react";
import { BodyHandles, Position } from "./BodyHandles";
import { BoxProps } from "./BoxBody";

export function Box2Controls({ store }: { store: StoreType; }) {

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

    const [position2, setPosition2] = useState<Position>([0, 0, 100, 100]);
    // function setPosition(v: Position) {
    //     console.log('setPosition', v);
    // }
    const [selected, setSelected] = useState(true);
    // function setSelected(v: boolean) {
    //     console.log('setSelected', v);
    // }

    return (
        <BodyHandles position={position2} setPosition={setPosition2} selected={selected} setSelected={setSelected} />
    );
}

export function Box2WithStore(props: Omit<BoxProps, 'store'>) {
    const store = useCreateStore();
    // return <BoxBody {...props} store={store} />;

    return (
        <Box2Controls {...props} store={store} />
    );
};

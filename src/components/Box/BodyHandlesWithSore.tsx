import { useCreateStore } from "leva";
import { useState } from "react";
import { BodyHandles, Position } from "./BodyHandles";
import { BoxBody, BoxProps } from "./BoxBody";

export function Box2WithStore(props: Omit<BoxProps, 'store'>) {
    const store = useCreateStore();
    // return <BoxBody {...props} store={store} />;

    const [position, setPosition] = useState<Position>([0,0,100,100]);
    // function setPosition(v: Position) {
    //     console.log('setPosition', v);
    // }
    const [selected, setSelected] = useState(true);
    // function setSelected(v: boolean) {
    //     console.log('setSelected', v);
    // }
    return (
        <BodyHandles position={position} setPosition={setPosition} selected={selected} setSelected={setSelected} />
    );
};

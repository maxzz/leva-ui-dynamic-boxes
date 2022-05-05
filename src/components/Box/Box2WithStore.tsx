import { useCreateStore } from "leva";
import { Box2Controls, Box2ControlsProps } from "./Box2Controls";

//type PropsWithoutStore<T> = T extends React.FC<infer Props> ? Omit<Props, 'store'> : never;

type PropsWithoutStore<T> = T extends (args: infer Props) => void ? Omit<Props, 'store'> : never;

var a: PropsWithoutStore<typeof Box2Controls> = {
    index: 0,
    //store: 0,
    selected: false,
    setSelect: (a) => {},
};
console.log(a);

export function Box2WithStore(props: Omit<Box2ControlsProps, 'store'>) {
    const store = useCreateStore();
    return (
        <Box2Controls {...props} store={store} />
    );
};

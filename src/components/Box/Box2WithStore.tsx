import { useCreateStore } from "leva";
import { Box2Controls, Box2ControlsProps } from "./Box2Controls";

//type Props<T> = T extends (...args: any[]) => infer R ? R : never;
// var a: Props<Box2ControlsProps> = Box2Controls;
// console.log(a);

// type PropsFrom<T> = T extends React.FC<infer Props> ? Props : never;
// var a: PropsFrom<typeof Box2Controls> = {
//     index: 0,
//     store: useCreateStore(),
//     selected: false,
//     setSelect: (a) => {},
// };
// console.log(a);

type PropsFrom<T> = T extends React.FC<infer Props> ? Omit<Props, 'store'> : never;
var a: PropsFrom<typeof Box2Controls> = {
    index: 0,
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

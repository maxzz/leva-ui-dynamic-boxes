import { useCreateStore } from "leva";
import { BoxBody, BoxProps } from "./BoxBody";

export function BoxWithStore(props: Omit<BoxProps, 'store'>) {
    const store = useCreateStore();
    return <BoxBody {...props} store={store} />;
};

// const withStore = (BaseComponent: any) => (props: any) => {
//     const store = useCreateStore();
//     return <BaseComponent {...props} store={store} />;
// };

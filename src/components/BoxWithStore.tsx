import { useCreateStore } from "leva";
import { Box, BoxProps } from "./Box";

export function BoxWithStore(props: Omit<BoxProps, 'store'>) {
    const store = useCreateStore();
    return <Box {...props} store={store} />;
};

// const withStore = (BaseComponent: any) => (props: any) => {
//     const store = useCreateStore();
//     return <BaseComponent {...props} store={store} />;
// };

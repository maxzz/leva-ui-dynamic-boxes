import { useCreateStore } from "leva";
import { Box2Controls, Box2ControlsProps } from "./Box2Controls";

export function Box2WithStore(props: Omit<Box2ControlsProps, 'store'>) {
    const store = useCreateStore();
    // return <BoxBody {...props} store={store} />;

    return (
        <Box2Controls {...props} store={store} />
    );
};

import React, { useEffect, useCallback } from 'react';
import { folder, useControls, useCreateStore } from 'leva';
import { useDropzone } from 'react-dropzone';
import { useDrag } from '@use-gesture/react';
import { StoreType } from 'leva/dist/declarations/src/types';

export type BoxData = {
    index: number;
    store: StoreType | null;
};

type BoxProps = {
    index: number;
    store: StoreType;
    selected: boolean;
    setSelect: ([]: [index: number, store: StoreType]) => void;
};

export function Box({ index, store, selected, setSelect }: BoxProps) {

    const [{ position, size, color, fillColor, fillMode, fillImage, width }, set] = useControls(() => (
        {
            position: { value: [window.innerWidth / 2 - 150, window.innerHeight / 2], step: 1, },
            size: { value: { width: 100, height: 100 }, min: 10, lock: true },
            fillMode: { value: 'color', options: ['image'] },
            fillColor: { value: '#cfcfcf', label: 'fill', render: (get) => get('fillMode') === 'color', },
            fillImage: { image: undefined, label: 'fill', render: (get) => get('fillMode') === 'image', },
            stroke: folder({ color: '#555555', width: { value: 1, min: 0, max: 10 } }),
        }),
        { store }
    );

    console.log('render', position.map(Math.floor), Object.entries(size).map((item) => ({ [item[0]]: Math.floor(item[1]) })));

    React.useEffect(() => {
        console.log('mounted');

        return () => {
            console.log('unmounted');
        };
    }, []);

    //TODO: problem: cannot call set from useDrag callback (Warning: Maximum update depth exceeded.)
    //TODO: problem: HMR will clear store object

    const bind = useDrag((
        {
            first,
            movement: [x, y],
            args: controls,
            memo = { position, size }
        }
    ) => {
        if (first) {
            setSelect([index, store]);
        }
        let _position = [...memo.position];
        let _size = { ...memo.size };

        controls.forEach(([control, mod]: [control: 'position' | 'width' | 'height', mod: number]) => {
            switch (control) {
                case 'position':
                    _position[0] += x;
                    _position[1] += y;
                    break;
                case 'width':
                    _size.width += x * mod;
                    if (mod === -1) _position[0] += x;
                    break;
                case 'height':
                    _size.height += y * mod;
                    if (mod === -1) _position[1] += y;
                    break;
                default:
            }
        });

        console.log('   set', _position.map(Math.floor), _size);
        // console.log('   set', _position.map(Math.floor), Object.entries(_size).map(([k, v]) => [k, Math.floor(v as number)] ));

        set({ position: _position, size: _size });
        return memo;
    });

    useEffect(() => {
        setSelect([index, store]);
    }, [index, store, setSelect]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            acceptedFiles.length && set({ fillImage: acceptedFiles[0], fillMode: 'image' });
        },
        [set]
    );

    const { getRootProps, isDragAccept } = useDropzone({ maxFiles: 1, accept: 'image/*', onDrop, noClick: true });

    return (
        <div
            {...getRootProps()}
            tabIndex={index}
            className={`box ${selected ? 'selected' : ''}`}
            style={{
                background: fillMode === 'color' || !fillImage ? fillColor : `center / cover no-repeat url(${fillImage})`,
                width: size.width,
                height: size.height,
                boxShadow: `inset 0 0 0 ${width}px ${color}`,
                transform: `translate(${position[0]}px, ${position[1]}px)`,
            }}
        >
            <span className="handle top" {...bind(['height', -1])} />
            <span className="handle right" {...bind(['width', 1])} />
            <span className="handle bottom" {...bind(['height', 1])} />
            <span className="handle left" {...bind(['width', -1])} />
            <span className="handle corner top-left" {...bind(['width', -1], ['height', -1])} />
            <span className="handle corner top-right" {...bind(['width', 1], ['height', -1])} />
            <span className="handle corner bottom-left" {...bind(['width', -1], ['height', 1])} />
            <span className="handle corner bottom-right" {...bind(['width', 1], ['height', 1])} />
            <span className="handle position" {...bind(['position'])} style={{ background: isDragAccept ? '#18a0fb66' : 'transparent' }} />
        </div>
    );
}

export function BoxWithStore(props: Omit<BoxProps, 'store'>) {
    const store = useCreateStore();
    return <Box {...props} store={store} />;
};


// const withStore = (BaseComponent: any) => (props: any) => {
//     const store = useCreateStore();
//     return <BaseComponent {...props} store={store} />;
// };

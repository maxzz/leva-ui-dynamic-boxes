import React, { useEffect, useCallback } from 'react';
import { folder, useControls } from 'leva';
import { useDropzone } from 'react-dropzone';
import { useDrag } from '@use-gesture/react';
import { StoreType } from 'leva/dist/declarations/src/types';
import './box.scss';
import { roundPos } from './Box2Handles';

export type BoxData = {
    index: number;
    store: StoreType | null;
};

export type BoxProps = {
    index: number;
    store: StoreType;
    selected: boolean;
    setSelect: ([]: [index: number, store: StoreType]) => void;
};

const roundSize = (size: Record<string, number>) => Object.fromEntries(Object.entries(size).map(([k, v]) => [k, Math.floor(v as number)]));

export function BoxBody({ index, store, selected, setSelect }: BoxProps) {

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

    // console.log('render', 'store:', store.storeId, roundPos(position), roundSize(size));

    // React.useEffect(() => {
    //     console.log('mounted', 'store:', store.storeId);
    //     return () => {
    //         console.log('un-----', 'store:', store.storeId);
    //     };
    // }, [store]);

    const bind = useDrag(({ first, movement: [x, y], args: controls, memo = { position, size } }) => {
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

        _position = roundPos(_position);
        _size = roundSize(_size);

        const stillTheSame = _position[0] === position[0] && _position[1] === position[1] && _size.width === size.width && _size.height === size.height;
        if (!stillTheSame) {
            // console.log('--------------------different----------------------------');
            // console.log('set1', roundPos(_position), roundSize(_size));

            set({ position: _position, size: _size });
            // console.log('set2', roundPos(_position), roundSize(_size));
        }

        return memo;
    });

    useEffect(() => {
        setSelect([index, store]);
    }, [index, store, setSelect]);

    const onDrop = useCallback((acceptedFiles: File[]) => acceptedFiles.length && set({ fillImage: acceptedFiles[0], fillMode: 'image' }), [set]);

    const { getRootProps: dropzoneProps, isDragAccept: isDragDropAccept } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, onDrop, noClick: true });

    return (
        <div
            {...dropzoneProps()}
            tabIndex={index}
            className={`box ${selected ? 'selected' : ''}`}
            style={{
                background: fillMode === 'color' || !fillImage ? fillColor : `center / cover no-repeat url(${fillImage})`,
                width: size.width,
                height: size.height,
                boxShadow: `inset 0 0 0 ${width}px ${strokeColor}`,
                transform: `translate(${position[0]}px, ${position[1]}px)`,
            }}
        >
            <div className="w-full h-full bg-red-100">11</div>

            <span className="handle top" {...bind(['height', -1])} />
            <span className="handle right" {...bind(['width', 1])} />
            <span className="handle bottom" {...bind(['height', 1])} />
            <span className="handle left" {...bind(['width', -1])} />

            <span className="handle corner top-left" {...bind(['width', -1], ['height', -1])} />
            <span className="handle corner top-right" {...bind(['width', 1], ['height', -1])} />
            <span className="handle corner bottom-left" {...bind(['width', -1], ['height', 1])} />
            <span className="handle corner bottom-right" {...bind(['width', 1], ['height', 1])} />

            <span className="handle position" {...bind(['position'])} style={{ background: isDragDropAccept ? '#18a0fb66' : 'transparent' }} />
        </div>
    );
}

//TODO: problem: cannot call set from useDrag callback (Warning: Maximum update depth exceeded.)
//TODO: problem: HMR will clear store object

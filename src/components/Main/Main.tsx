import React from 'react';
import { Leva, useControls, LevaPanel, button } from 'leva';
import { StoreType } from 'leva/dist/declarations/src/types';
import { Box, Box2, BoxData } from '../Box';
import './Main.scss';

export function Main() {
    const [boxes, setBoxes] = React.useState<BoxData[]>([]);
    const [[selection, store], setSelection] = React.useState<[index: number, store: StoreType | null]>([-1, null]);

    React.useEffect(() => {
        function deleteSelection(e: KeyboardEvent) {
            if (e.key === 'Backspace' && selection > -1 && (e.target as HTMLElement)?.classList.contains('selected')) {
                setBoxes((b) => {
                    const _b = [...b];
                    _b.splice(selection, 1);
                    return _b;
                });
                setSelection([-1, null]);
            }
        }
        window.addEventListener('keydown', deleteSelection);

        return () => window.removeEventListener('keydown', deleteSelection);
    }, [selection]);

    const unSelect = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelection([-1, null]);
        }
    };

    const addBox = () => {
        setBoxes((boxes) => [...boxes, {
            id: Date.now(),
            store: null,
        }]);
    };

    useControls({ 'New Box': button(addBox) });

    return (
        <div className="">
            <div className="wrapper">
                <div className="canvas" onClick={unSelect}>
                    {boxes.map((box, idx) => (
                        //<Box index={idx} selected={selection === idx} setSelect={setSelection} key={box.id} />
                        <Box2 index={idx} selected={selection === idx} setSelect={setSelection} key={box.id}>
                            <div style={{width: '100%', height: '100%', backgroundColor: 'red'}}></div>
                        </Box2>
                    ))}
                </div>
                <div className="panel">
                    <Leva fill flat titleBar={false} />
                    <LevaPanel store={store} fill flat titleBar={false} />
                </div>
                
            </div>
            {/* <div className="">github link</div> */}
        </div>
    );
}

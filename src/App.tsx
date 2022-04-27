import React, { useEffect, useCallback } from 'react';
import { folder, Leva, useControls, LevaPanel, useCreateStore, button } from 'leva';
import { Box } from './Box';
import './styles.css';

export default function App() {
    const [boxes, setBoxes] = React.useState([]);
    const [[selection, store], setSelection] = React.useState([-1, null]);

    React.useEffect(() => {
        function deleteSelection(e) {
            if (e.key === 'Backspace' && selection > -1 && e.target.classList.contains('selected')) {
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

    const unSelect = (e) => {
        if (e.target === e.currentTarget) {
            setSelection([-1, null]);
        }
    };

    const addBox = () => {
        setBoxes((b) => [...b, Date.now()]);
    };

    useControls({ 'New Box': button(addBox) });

    return (
        <div className="wrapper">
            <div className="canvas" onClick={unSelect}>
                {boxes.map((v, i) => (
                    <Box key={v} selected={selection === i} index={i} setSelect={setSelection} />
                ))}
            </div>
            <div className="panel">
                <Leva fill flat titleBar={false} />
                <LevaPanel store={store} fill flat titleBar={false} />
            </div>
        </div>
    );
}

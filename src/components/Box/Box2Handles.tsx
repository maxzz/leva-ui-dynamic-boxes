import { useDrag } from '@use-gesture/react';
import './box.scss';

export type Position = [x: number, y: number, width: number, height: number];

export const roundPos = <T extends number[]>(position: T): T => position.map(Math.floor) as T;
const diffArrays = <A extends number[], B extends number[]>(a: A, b: B): boolean => a.length !== b.length || a.some((_a, idx) => _a !== b[idx]);

type BodyHandlersProps = {
    position: Position;
    setPosition: (v: Position) => void;
    selected: boolean;
    setSelected: (v: boolean) => void;
    children?: React.ReactNode;
};

export function BodyHandles({ position, setPosition, selected, setSelected, children }: BodyHandlersProps) {

    const bind = useDrag(({ first, movement: [x, y], args: controls, memo = { position, updateCnt: 0 } }) => {
        if (first) {
            setSelected(true);
        }

        let newPos = [...memo.position] as Position;

        controls.forEach(([control, mod]: [control: 'position' | 'width' | 'height', mod: number]) => {
            switch (control) {
                case 'position':
                    newPos[0] += x;
                    newPos[1] += y;
                    break;
                case 'width':
                    newPos[2] += x * mod;
                    if (mod === -1) newPos[0] += x;
                    //console.log('pos width ', roundPos(newPos), memo.position);
                    break;
                case 'height':
                    newPos[3] += y * mod;
                    if (mod === -1) newPos[1] += y;
                    //console.log('pos height', roundPos(newPos), memo.position);
                    break;
                default:
            }
        });

        newPos = roundPos(newPos);

        //console.log('--loop', memo.updateCnt);

        memo.updateCnt++;
        if (diffArrays(newPos, position)) {
            console.log('------------set', memo.updateCnt);
            
            setPosition(newPos);
        }

        return memo;
    });

    return (
        <div
            className={`box${selected ? ' selected' : ''}`}
            style={{ width: position[2], height: position[3], transform: `translate(${position[0]}px, ${position[1]}px)`, }}
        >
            {children}

            <span className="handle top" {...bind(['height', -1])} />
            <span className="handle right" {...bind(['width', 1])} />
            <span className="handle bottom" {...bind(['height', 1])} />
            <span className="handle left" {...bind(['width', -1])} />

            <span className="handle corner top-left" {...bind(['width', -1], ['height', -1])} />
            <span className="handle corner top-right" {...bind(['width', 1], ['height', -1])} />
            <span className="handle corner bottom-left" {...bind(['width', -1], ['height', 1])} />
            <span className="handle corner bottom-right" {...bind(['width', 1], ['height', 1])} />

            <span className="handle position" {...bind(['position'])} />
        </div>
    );
}

import { useDrag } from '@use-gesture/react';
import './box.scss';

export type Position = [x: number, y: number, width: number, height: number];

export const roundPos = <T extends number[]>(position: T): T => position.map(Math.floor) as T;

type BodyHandlersProps = {
    position: Position;
    setPosition: (v: Position) => void;
    selected: boolean;
    setSelected: (v: boolean) => void;
    children?: React.ReactNode;
};

export function BodyHandles({ position, setPosition, selected, setSelected, children }: BodyHandlersProps) {

    const bind = useDrag(({ first, movement: [x, y], args: controls, memo = { position } }) => {
        if (first) {
            setSelected(true);
        }

        let _position = [...memo.position] as Position;

        controls.forEach(([control, mod]: [control: 'position' | 'width' | 'height', mod: number]) => {
            switch (control) {
                case 'position':
                    _position[0] += x;
                    _position[1] += y;
                    break;
                case 'width':
                    _position[2] += x * mod;
                    if (mod === -1) _position[0] += x;
                    break;
                case 'height':
                    _position[3] += y * mod;
                    if (mod === -1) _position[1] += y;
                    break;
                default:
            }
        });

        _position = roundPos<Position>(_position);

        const stillTheSame = _position[0] === position[0] && _position[1] === position[1] && _position[2] === position[2] && _position[3] === position[3];
        if (!stillTheSame) {
            setPosition(_position);
        }

        return memo;
    });

    return (
        <div
            className={`box ${selected ? 'selected' : ''}`}
            style={{ width: position[2], height: position[3], transform: `translate(${position[0]}px, ${position[1]}px)`, }}
        >
            {/* <div className="w-full h-full bg-red-100">{children}</div> */}
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

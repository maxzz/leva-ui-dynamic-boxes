import { useCreateStore } from "leva";
import React from "react";
import { Box2Controls, Box2ControlsProps } from "./Box2Controls";

//type PropsWithoutStore<T> = T extends React.FC<infer Props> ? Omit<Props, 'store'> : never;

type PropsWithoutStore<T> = T extends (args: infer Props) => void ? Omit<Props, 'store'> : never;

/** /
var a: PropsWithoutStore<typeof Box2Controls> = {
    index: 0,
    //store: 0,
    selected: false,
    setSelect: (a) => { },
};
console.log(a);
/**/

// export function Box2WithStore(props: Omit<Box2ControlsProps, 'store'>) {
//     const store = useCreateStore();
//     return (
//         <Box2Controls {...props} store={store} />
//     );
// };

/**/
export function Box2WithStore(props: PropsWithoutStore<typeof Box2Controls>) {
    const store = useCreateStore();
    return (
        <Box2Controls {...props} store={store} />
    );
};
/**/

/** /
type PropsWithoutChildren<T> = T extends (args: infer Props) => void ? Omit<Props, 'children'> : never;

export function Box2WithStore<T = typeof Box2Controls>({ children, ...props }: { children: T, props: Omit<T, 'children'>; }) {
    const store = useCreateStore();
    return (
        { children({ ...props, store }); }
    );
};
/**/





//https://stackoverflow.com/questions/69266591/react-cloneelement-typescript/69267088#69267088 'React.cloneElement & Typescript'
//https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDGMA0cDecCuAzkgMowoxJwC+cAZlBCHAORSoYsBQXd+AdhmAR+cAIJgwACgCUuLnDjsY+KKKkLFcADwATYADcAfJq06AQgBsIaANZxgugLwAiIkiiEAtGiaR+SPwwLnAwwDCWSK4AqsSecAAqKABGkSEmZmY4snBORjoAsgCeSalUaJYohISu7p4hAPRG1KZa2g1WNrYZmdqddg7OLoTkKt6+4CKBwaHhka5kFERwAMJ+U0HprVlSYIxghHJ5OotjcBVVNcOjRCE4AHSPexAHtE0tmTod1nY9Zn0-eyOVzJXQoIrjdYBTazCJRFzmMEQ1ZQ6YuP6ZbLPA5HfJ9JGEc6Vaoggl3R73bGEN7NbZffrdVrtfTGTQyLgtLjAIIeOjoKgASQZ8kUaAAFsBLLp2PwAFxwXb7QjynB0lC6XQrYnEZWIDgwe4AEWAhDAFHF2mQ6ANJCQMFOSDEQhE2hGUG5AHMANoAXSMRkwdJlSAA7gk5kh5VaMEaTWaYBboza7Q6nWEXW7Pf7WtRcXrrfckwA5CC6JCBxSOeWZ-geiuwyLVmDu2scni+fgjOAMqP6+4AMRW2iFgPyTgVVPlI66edVopEXa9F2qSEI2HVmu1q59uQIxAdrubnt9RikXpcLh97PnnfgXrCcOwwbDEZ34-cB5rHtPVPuD8i15KHaqjqEyLKDE4OC-o4tDLoQRYoCAUQ4HBq73AAVhA3JSCELgyNQGKKNoYoAExGDg-5INQ7SkYRuC-uKkrSoEUh4BuWqXKuT6BKG4ZwjQ+FMg0LI9OynJ8II6aiMUpSRIqLy6ngcFNi2HoCSKQEqGoOjkGUeINLpkQmJy3KUFAfJoIKpzLHORKXCpnr1s+fGNgqlEObWeYGFhuhtrwAjOqI1mEPJBxTsFci2R2XZiig-C6JEWrAAM45SO5cBfnmv7ORGaURoByggQqYGGHR2jJPgMAwCIcAiEldiQTkxyxfFiWWMltg4QEL5wnhBFFqGiQRu0FVVSIGLMqVbJ+aZvL8nAQqGuChJRdqHl1po7FbrqUiobqX6+l5Pl+RJgXdgSoW6oty2RZo0XwC1CVIPV9ipd1HHVOtMjyt5ji5Pkv5bZxIVeu92pXpohXaRo-zgXBCFIZBDHagRdLlZV1WiHV7UNdkeaPW1HVdaGH2EH1RgDSGqzaiNGPjUJInTS0QA
//https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDGMA0cDecCuAzkgMowoxJwC+cAZlBCHAORSoYsBQXwAdpSh10VAJIAhADYQ0Aa1xc4cNAAtgkgCbs+ALjgAKMIzCE9ORUssoNGgMKSUhYqcQcYAOgAiwQmAqqAHmR0DxIkGDIKJABBDGAIPgDCGCh+AHMAbQBdAD4czAtLOG0kAHcAFWAYSSQ9YIwvHz8YQPrQ8MjKWJh4xOTUvjS8wpoASjgAXhzXEPc2gDkIDSQCpWANPX701bge6tq4LcGuah40BOS4KRlZOrd3ADFbAIlpOWmJgyMIEz1Xm-GUwUSnOfEuGTQDicSEI2GsdihziykwIxE6SCSKXS2Ry+gyACJ8VlRhZQeC9jVsCUKlUasjPkRSORKJiBkNDMZCO4KUgSUp2DB8FA+AYRgENMAAG5wdYTHDfEzuda0SGOQjzFAgJBy1XQrkAKwg-H0+Lg+NG1ByIyUARUACYcjgedQAgB6e1WopKeWc9yqdRaJB8fR4eH2NUwqlBsqVfZjU5FN0SyWeuAk05cOj4PhxBJwACyAE9yigAEY1Dk-Fx4XWEADMmyxgzGwOK4SFIoC5HLSGmbu7NStGf4gmEaDEnSIrdrAEZG2ydtTYzU9PoefP0oDppKjRoTjwszmennJ4RK784KJT+NzCCLvAVCg+BoavZgHIUWvaQcjmkt3AFS5Jdvy-fY+TbQVhVFRNk1TRNS3wGAYDzBI3zkOV9H-R9n1fSR31kE0+Bjb9zUteYyjgZcMVdBCkISOC4CTKVU3THgRyQIQREvcRPBQQtCGnRE7Q3QYdjDREYVXWtJMOJtMmJSZt13fdM2zXMRXEDQ+LPQC-h47Sb1Je84Gwl8kDQ+RPn0IjSnDJwRL-PQd3WRSAN9cSIzPDIbLswhiQsAUO2gyxxSlZREQ1LU5UAv0hMta1GNo5CRVQvD0JwTDXNM3D8MIspfNInJyNKOBfLdJL6LFV1YIsVjVKPXo4GiMAwEy28IKC-QxRqr1GOuD9ZXxRkoEIU0eQmfEAFViBG00GKKDL-wCIsSx7cK1TrCbhtGuBXRyBMvTdfrZHmvq3nkQbkgoIgxu-CbTzmhLvXPQgltPdanBnCarsFHacHcAHANoPaDsTV1jtOgJjplDQJtLLT+Nu-YJs07T8VO57AKW1H+I+wg7ThhG-oB9wgd2-aEqO86GKYlNav3IA
//https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgJICEA2B7BBrZAbwChkzkEALYTAEyghAC5kAKABym3YGcWTyg5HFq0Awpjg8eEPsgBKERGAB0AEWA92cMFQA8i5SoDKEMMbA6IAQQRhg2EHp5gooAOYBtALoA+XwA0pEJkDCAQAO4AKsBgmBAshnbqmtq6lAZKyabmlpC29o7Orh7+ANzBZAC+AJTIALy+ClmqSWAActi0EEGCwLQsLm4g7r3k9nEJyEMeFVXExAiOLshYuHiJLSoAYmJ6GDj4TfVsnNxyB+t1jUSVFMtgyJ4IktKyAcKiElIyPN4NzSMAFcZBYrMVhl4-KxPAAiWHeGoVQRLEArTwTeIfMKRGKTf4nNoqEEQMGQCGlDhcXgqTEQJF3BhgIFQEBsO6CPS0YAAN2Q-XqhDONP6VQorx47TgAFsIIKXj9ZCoAFbYUCsWHIWE1Kq+DkhZB6SgAJl8hDpVT0AHoTXqDUIhdSeCoqDR6IxWIRPuIJe9kDjorF4shavN7dbuTy7eQGVUKsQYECQHYHGyALIATyicAARvEqed+OKfgBmQYlEZlEN1ATkJkstl6Sx5iBNa3N+K+OYLUCQWCIFCoMkg24oiUARnLkLGoUYuKDU1YdKnHmuTR5ato3YTSZTjmQw54Bd4LCHeRBNbuqJWlDgIFo8QkwHwAKXC5XIzXyGFzoDePzdIMoI9asuy4aRtG9pkHoOZAmAYD7o4T74IKrBfre96Ppgz54Bq4SBpM2q6u0kTIP+EDWrB8GOJBQgRrytGxj24DQPASBoOgahwBmPCjuQCrSMaH6jHcIg+oqcisAJvzCT4X4bv026JsmhRsugtDcUeP6npxmmXiiDzIBhD4QMhBAnKw+HfNIwk1CwCm0A0TQ-ioYnWb8MJWRKiLInWZgNmBBpcryxbSFKsqCi50nGrq+ohDBcEIWySHYShhBoU5Rl3iZZl4ZE7lEb4JERMg7mUYlNFxYaVoQXcTE7ipqbINY7DsBltazsyoGsFVwVRlVnJrC+AqwiSUA8JqdL1LCACqMjjbCZoZTceiZtmLahTwJbTWNE3IFaviWlaQ14LR4YnfytDTS4OggpNC7TYei3pT+X56Iem3jtd557YQKj-T+YoHUdJ1nUFF0jTmGk8fdkzTepmnPcePBvQjPGbca01Q4jRD-SogP7Yd1qg71NUMXV3ZAA
//import React, { useState } from 'react'

interface IBlock {
    children: (props: {
        addClasses: React.Dispatch<React.SetStateAction<string[]>>,
        renewTitle: React.Dispatch<React.SetStateAction<string>>;
    }) => React.ReactNode,
    id: string,
    title: string;
}

const Block: React.FC<IBlock> = (props: IBlock) => {
    const [classes, addClasses] = React.useState<string[]>([""]);
    const [title, renewTitle] = React.useState<string>(props.title);
    return (
        <div id={props.id} className={classes.join(" ")}>
            <h2>{title}</h2>
            {props.children({ addClasses, renewTitle })}
        </div>
    );
};

function MyTable(props: { class1: string; }) {
    return <table> </table>;
}

interface IStatus {
    class2: string,
    renewTitle: (title: string) => void;
}

function Status(props: IStatus) {
    const handleClick = (title: string) => props.renewTitle(title);
    return (
        <div>
            <button onClick={() => handleClick("newTitle")}>New Title</button>
        </div>
    );
}

interface IBDays {
    class3: string,
    addClasses: (classes: string[]) => void;
}

function Bdays(props: IBDays) {
    const handleClick = (newClass: string): void => props.addClasses([newClass]);
    return (
        <div className={props.class3}>
            <button onClick={() => handleClick("newClass")}>New Class</button>
        </div>
    );
}

function App() {
    return (
        <div>
            <Block id="users" title="Users">{() => <MyTable class1="users" />}</Block>
            <Block id="status" title="Status">{(props) => <Status class2="status" {...props} />}</Block>
            <Block id="bdays" title="Bdays">{(props) => <Bdays class3="bdays" {...props} />}</Block>
        </div>
    );
}

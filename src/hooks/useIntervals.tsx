import React, { Dispatch, SetStateAction, useState } from "react"

const useSetCount = () => {

    const [count, setCounter] = useState(
        {
            image: 0,
        }
    );
    return [count, (data: string, num: number) => {
        return setCounter((prev) => { return { ...prev, [data]: num } })
    }] as const

}

export const useIncrementData = () => {

    const [count, setCount] = useSetCount();
    return [count, setCount, (greater: number, target: 'image', operator: boolean) => {

        if (operator && count[target] < greater) return setCount(target, (count[target] + 1));
        if (operator && count[target] >= greater) return setCount(target, (count[target] - count[target]));

        if (!operator && count[target] > greater) return setCount(target, (count[target] - 1))
        if (!operator && count[target] <= greater) return setCount(target, greater)

        else return setCount;
    }] as const

};
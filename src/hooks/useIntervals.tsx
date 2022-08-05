import React, { Dispatch, SetStateAction, useState } from "react"

const useSetCount = () => {
    const [count, setCounter] = useState<any>({ "image-slider": 0 });
    return [count, (data: string, num: number) => {
        return setCounter((prev: object) => { return { ...prev, [data]: num } })
    }]
}
export const useIncrementData = () => {
    const [count, setCount] = useSetCount();
    return [count, setCount, (greater: number, target: string, operator: boolean): React.Dispatch<React.SetStateAction<boolean>> => {
        //return count/setCount here, no need to import useSetCount outside of useIncrementData

        if (operator && count[target] < greater) return setCount(target, (count[target] + 1))
        if (operator && count[target] >= greater) return setCount(target, (count[target] - count[target]));

        if (!operator && count[target] > greater) return setCount(target, (count[target] - 1))
        if (!operator && count[target] <= greater) return setCount(target, greater)

        else return setCount;
    }]
};
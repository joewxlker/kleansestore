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

    interface Increment<value> {
        [target: string]: value
    }

    const [count, setCount] = useSetCount();
    return [count, setCount, (greater: number, target: 'image', operator: boolean) => {
        //return count/setCount here, no need to import useSetCount outside of useIncrementData
        console.log(greater, target, count, setCount)

        if (operator && count[target] < greater) return setCount(target, (count[target] + 1));
        if (operator && count[target] >= greater) return setCount(target, (count[target] - count[target]));

        if (!operator && count[target] > greater) return setCount(target, (count[target] - 1))
        if (!operator && count[target] <= greater) return setCount(target, greater)

        else return setCount;
    }] as const

};
import React, { useState } from "react"

const useSetCount = () => {
    const [count, setCounter] = useState<any>({ "iteratePValues": 0, "iterateRepoValues": 0, "repos": 0, "shopSlider": 0 });
    return [count, (data: string, num: number) => {
        return setCounter((prev: object) => {return{...prev, [data]: num}})
    }]
}
export const useIncrementData = () => {
    const [count, setCount] = useSetCount();
    return [count, setCount, (greater: number, target: string, operator: boolean):React.Dispatch<React.SetStateAction<boolean>> => {
        //return count/setCount here, no need to import useSetCount outside of useIncrementData
           
        if (operator && count[target] < greater)  return setCount(target, (count[target] + 1))
        if (operator && count[target] >= greater) return setCount(target, 0);

        if (!operator && count[target] > greater) return setCount(target, (count[target] - 1))
        if (!operator && count[target] <= greater) return setCount(target, greater)
           
        else return setCount;
    }]
};
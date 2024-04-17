import {createStore, createEvent, sample} from 'effector';
import {$rate} from "@/store/rate.ts";
import {useUnit} from "effector-react";

export const valueFromInputChanged = createEvent<number>()
const setValueFrom = createEvent<number>()

export const $valueFrom =
    createStore<number>(0)
        .on(valueFromInputChanged, (_, value) => value)
        .on(setValueFrom, (_, value) => value)

// $valueFrom.watch((state) => {
//     console.log(state)
// })

export const valueToInputChanged = createEvent<number>()
const setValueTo = createEvent<number>()

export const $valueTo =
    createStore<number>(0)
        .on(valueToInputChanged, (_, value) => value)
        .on(setValueTo, (_, value) => value)

// $valueTo.watch((state) => {
//     console.log(state)
// })

sample({
    clock: valueFromInputChanged,
    source: {
        valueFrom: $valueFrom,
        rate: $rate
    },
    fn: ({valueFrom, rate}) => {
        return parseFloat((valueFrom * rate).toFixed(2))
    },
    target: setValueTo,
})

sample({
    clock: valueToInputChanged,
    source: {
        valueTo: $valueTo,
        rate: $rate
    },
    fn: ({valueTo, rate}) => {
        return parseFloat((valueTo / rate).toFixed(2))
    },
    target: setValueFrom,
})


export const useValues = () => useUnit({
    valueFrom: $valueFrom,
    valueTo: $valueTo
})

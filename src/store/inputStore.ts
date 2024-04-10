import { createStore, createEvent } from 'effector';

export const valueFromChanged = createEvent<number>()


export const $valueFrom =
    createStore<number>(0)
        .on(valueFromChanged, (_, value: number) => value)

$valueFrom.watch((state) => {
    console.log(state)
})


export const valueToChanged = createEvent<number>()


export const $valueTo =
    createStore<number>(0)
        .on(valueToChanged, (_, value: number) => value)
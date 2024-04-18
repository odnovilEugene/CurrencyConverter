import {createEvent, createStore, sample} from "effector";
import {mockRate} from "mock/index.ts";
import {$isSwitched, setIsSwitched} from "@/store/currency.ts";

export const setRate = createEvent<number>()

export const $rate =
    createStore<number>(mockRate)
        .on(setRate, (_, value) => value)


sample({
    clock: setIsSwitched,
    source: {
        isSwitched: $isSwitched,
        rate: $rate
    },
    filter: ({isSwitched}) => isSwitched,
    fn: ({rate}) => 1 / rate,
    target: setRate,
})
import {createEvent, createStore, sample} from "effector";
import {mockRate} from "@/types/Currency.ts";
import {$switched, setSwitched} from "@/store/currency.ts";

export const setRate = createEvent<number>()

export const $rate =
    createStore<number>(mockRate)
        .on(setRate, (_, value) => value)

sample({
    clock: setSwitched,
    source: {
        switched: $switched,
        rate: $rate
    },
    filter: ({switched}) => switched === true,
    fn: ({rate}) => 1 / rate,
    target: setRate,
})
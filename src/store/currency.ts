import {createStore, createEvent} from 'effector';
import {Currency, initialFrom, initialTo} from "@/types/Currency.ts";
export const currencyFromSelected = createEvent<Currency>();


export const $currencyFrom =
    createStore<Currency>(initialFrom)
        .on(currencyFromSelected, (_, selectedCurrency) => selectedCurrency)

// $currencyFrom.watch((state) => {
//     console.log(state)
// })


export const currencyToSelected = createEvent<Currency>();

export const $currencyTo =
    createStore<Currency>(initialTo)
        .on(currencyToSelected, (_, selectedCurrency) => selectedCurrency)

// $currencyTo.watch((state) => {
//     console.log(state)
// })


export const setSwitched = createEvent<boolean>()

export const $switched =
    createStore<boolean | null>(null)
        .on(setSwitched, (_, state) => state)


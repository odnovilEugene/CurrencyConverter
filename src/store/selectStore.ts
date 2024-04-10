import { createStore, createEvent } from 'effector';
import {Currency, initialFrom, initialTo} from "@/types/Currency.ts";


export const currencyFromSelected = createEvent<Currency>();
export const setCurrencyFrom = createEvent<Currency>()


export const $currencyFrom =
    createStore<Currency>(initialFrom)
        .on(setCurrencyFrom, (_, newCurrency) => newCurrency)
        .on(currencyFromSelected, (_, selectedCurrency) => selectedCurrency)

// $currencyFrom.watch((state) => {
//     console.log(state)
// })

export const currencyToSelected = createEvent<Currency>();
export const setCurrencyTo = createEvent<Currency>()


export const $currencyTo =
    createStore<Currency>(initialTo)
        .on(setCurrencyTo, (_, newCurrency) => newCurrency)
        .on(currencyToSelected, (_, selectedCurrency) => selectedCurrency)

// $currencyTo.watch((state) => {
//     console.log(state)
// })

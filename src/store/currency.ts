import {createStore, createEvent} from 'effector';
import {Currency} from "@/types/Currency.ts";
import {useUnit} from "effector-react";


export const initialFrom: Currency = {
    code: "USD"
}

export const initialTo: Currency = {
    code: "RUB"
}


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


export const setIsSwitched = createEvent<boolean>()

export const $isSwitched =
    createStore<boolean>(false)
        .on(setIsSwitched, (_, state) => state)


export const useCurrencies = () => useUnit({
    currencyFrom: $currencyFrom,
    currencyTo: $currencyTo
})
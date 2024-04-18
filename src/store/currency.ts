import { createEvent, restore } from 'effector';
import {Currency} from "@/types/Currency.ts";
import {useUnit} from "effector-react";


export const initialFrom: Currency = {
    code: "USD"
}

export const initialTo: Currency = {
    code: "RUB"
}

export const currencyFromSelected = createEvent<Currency>();
export const $currencyFrom = restore(currencyFromSelected, initialFrom)


export const currencyToSelected = createEvent<Currency>();
export const $currencyTo = restore(currencyToSelected, initialTo)


export const setIsSwitched = createEvent<boolean>()
export const $isSwitched = restore(setIsSwitched, false)


export const useCurrencies = () => useUnit({
    currencyFrom: $currencyFrom,
    currencyTo: $currencyTo
})
import { createEvent, restore, sample } from 'effector';
import { Currency } from 'types/Currency.ts';
import { mockCurrencies } from '@/mock';
import { currencyFromSelected, currencyToSelected } from '@/store/currency.ts';


export const currenciesFetched = createEvent<Currency[]>()
export const $currencyList = restore(currenciesFetched, mockCurrencies)

sample({
    clock: currenciesFetched,
    source: {
        currencyList: $currencyList
    },
    fn: ({currencyList}) => {
        return currencyList[0]
    },
    target: currencyFromSelected,
})

sample({
    clock: currenciesFetched,
    source: {
        currencyList: $currencyList
    },
    fn: ({currencyList}) => {
        return currencyList[1]
    },
    target: currencyToSelected,
})
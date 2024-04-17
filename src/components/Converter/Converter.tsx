import {FC, useEffect, useState} from "react";
import s from "components/Converter/Converter.module.scss"
import CurrencyConverter from "components/Converter/CurrencyConverter/CurrencyConverter.tsx";
import CurrencyCosts from "components/Converter/CurrencyCosts/CurrencyCosts.tsx";
import CurrencyHistory from "components/Converter/CurrencyHistory/CurrencyHistory.tsx";
import { Currency, CurrencyDateRate } from "types/Currency.ts"
import { mockCurrencies, mockHistory } from "mock/index.ts";
import {getAllCurrencies, getCurrencyRate} from "@/api/currencyApi.ts";
import {$isSwitched, currencyFromSelected, currencyToSelected, useCurrencies} from "@/store/currency.ts";
import {useUnit} from "effector-react";
import {setRate} from "@/store/rate.ts";
import { clsx } from "clsx";

const Converter: FC = () => {

    const [showCosts, setShowCosts] = useState<boolean>(true)
    const [showHistory, setShowHistory] = useState<boolean>(true)

    const [currencies, setCurrencies] = useState<Currency[]>(mockCurrencies)
    const [history] = useState<CurrencyDateRate[]>(mockHistory)

    const { currencyFrom, currencyTo } = useCurrencies()
    const isSwitched = useUnit($isSwitched)

    // useEffect(() => {
    //     getAllCurrencies()
    //         .then(r => {
    //             setCurrencies(r)
    //             currencyFromSelected(r[0])
    //             currencyToSelected(r[1])
    //         })
    // }, [])

    // useEffect(() => {
    //     if (!isSwitched) {
    //         getCurrencyRate(currencyFrom, currencyTo)
    //             .then(r => {
    //                 setRate(r)
    //             })
    //     }
    // }, [currencyFrom, currencyTo])

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.displayButtons}>
                    <button
                        className={clsx(s.button, showCosts ? s.active : '')}
                        onClick={() => setShowCosts(!showCosts)}
                    >
                        Show rates
                    </button>
                    <button
                        className={clsx(s.button, showHistory ? s.active : '')}
                        onClick={() => setShowHistory(!showHistory)}
                    >
                        Show costs
                    </button>
                </div>
                <div className={s.converter}>
                    <div className={s.currencies}>
                        <CurrencyConverter currencies={currencies}/>
                    </div>
                    <div className={clsx(s.costs, !showCosts && s.hide)}>
                        <CurrencyCosts />
                    </div>
                    <div className={clsx(s.history, !showHistory && s.hide)}>
                        <CurrencyHistory history={history} />
                    </div>
                </div>
            </div>
            <div className={s.background} />
        </div>
    );
};

export default Converter;
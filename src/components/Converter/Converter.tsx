import {FC, useEffect, useState} from "react";
import s from "components/Converter/Converter.module.scss"
import CurrencyConverter from "components/Converter/CurrencyConverter/CurrencyConverter.tsx";
import CurrencyCosts from "components/Converter/CurrencyCosts/CurrencyCosts.tsx";
import CurrencyHistory from "components/Converter/CurrencyHistory/CurrencyHistory.tsx";
import { CurrencyDateRate } from "types/Currency.ts"
import { mockHistory } from "mock/index.ts";
import {getAllCurrencies, getCurrencyRate} from "@/api/currencyApi.ts";
import {$isSwitched, useCurrencies} from "@/store/currency.ts";
import {useUnit} from "effector-react";
import {setRate} from "@/store/rate.ts";
import { clsx } from "clsx";
import { currenciesFetched } from '@/store/currencyList.ts';

const Converter: FC = () => {

    const [isCostVisible, setIsCostVisible] = useState(true)
    const [isHistoryVisible, setIsHistoryVisible] = useState(true)

    const setCurrencies = useUnit(currenciesFetched)

    const [history] = useState<CurrencyDateRate[]>(mockHistory)

    const { currencyFrom, currencyTo } = useCurrencies()
    const isSwitched = useUnit($isSwitched)

    useEffect(() => {
        getAllCurrencies()
            .then(r => {
                setCurrencies(r)
            })
            .catch((e) => console.log(e))
    }, [setCurrencies])

    useEffect(() => {
        if (!isSwitched) {
            getCurrencyRate(currencyFrom, currencyTo)
                .then(r => {
                    setRate(r)
                })
                .catch((e) => console.log(e))
        }
    }, [currencyFrom, currencyTo, isSwitched])

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.displayButtons}>
                    <button
                        className={clsx(s.button, isCostVisible ? s.active : '')}
                        onClick={() => setIsCostVisible(!isCostVisible)}
                    >
                        Show rates
                    </button>
                    <button
                        className={clsx(s.button, isHistoryVisible ? s.active : '')}
                        onClick={() => setIsHistoryVisible(!isHistoryVisible)}
                    >
                        Show Chart
                    </button>
                </div>
                <div className={s.converter}>
                    <div className={s.currencies}>
                        <CurrencyConverter />
                    </div>
                    <div className={clsx(s.costs, !isCostVisible && s.hide)}>
                        <CurrencyCosts />
                    </div>
                    <div className={clsx(s.history, !isHistoryVisible && s.hide)}>
                        <CurrencyHistory history={history} />
                    </div>
                </div>
            </div>
            <div className={s.background} />
        </div>
    );
};

export default Converter;
import {FC, useState} from "react";
import s from "components/Converter/Converter.module.scss";
import CurrencyConverter from "components/Converter/CurrencyConverter/CurrencyConverter.tsx";
import CurrencyCosts from "components/Converter/CurrencyCosts/CurrencyCosts.tsx";
import CurrencyHistory from "components/Converter/CurrencyHistory/CurrencyHistory.tsx";
import {Currency, CurrencyDateRate, mockCurrencies, mockHistory} from "types/Currency.ts";
import {getAllCurrencies, getCurrencyRate} from "@/api/currencyApi.ts";
import {$currencyFrom, $currencyTo, $switched} from "@/store/currency.ts";
import {useUnit} from "effector-react";
import {$rate, setRate} from "@/store/rate.ts";
import { clsx } from "clsx";

const Converter: FC = () => {

    const [showCosts, setShowCosts] = useState<boolean>(true)
    const [showHistory, setShowHistory] = useState<boolean>(true)

    const [currencies, setCurrencies] = useState<Currency[]>(mockCurrencies)
    const [history, setHistory] = useState<CurrencyDateRate[]>(mockHistory)

    const [currencyFrom, currencyTo] = useUnit([$currencyFrom, $currencyTo])
    const switched = useUnit($switched)

    // useEffect(() => {
    //     getAllCurrencies()
    //         .then(r => setCurrencies(r))
    // }, [])

    // useEffect(() => {
    //     if (!switched) {
    //         getCurrenciesRate(currencyFrom, currencyTo)
    //             .then(r => setRate(r))
    //     }
    // }, [switched])

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.displayButtons}>
                    <button
                        className={showCosts ? s.active : ''}
                        onClick={() => setShowCosts(!showCosts)}
                    >
                        Show costs
                    </button>
                    <button
                        className={showHistory ? s.active : ''}
                        onClick={() => setShowHistory(!showHistory)}
                    >
                        Show history
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
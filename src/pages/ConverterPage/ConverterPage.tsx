import {FC, useEffect, useState} from "react";
import s from "pages/ConverterPage/ConverterPage.module.scss";
import CurrencyConverter from "components/ConverterPage/CurrencyConverter/CurrencyConverter.tsx";
import CurrencyCosts from "components/ConverterPage/CurrencyCosts/CurrencyCosts.tsx";
import CurrencyHistory from "components/ConverterPage/CurrencyHistory/CurrencyHistory.tsx";
import {Currency} from "@/type/Currency.ts";
import {fetchAllCurrencies} from "@/api/currencyApi.ts";

const ConverterPage: FC = () => {

    const [currencies, setCurrencies] = useState<Currency[]>([])

    useEffect(() => {
        fetchAllCurrencies()
            .then(r => setCurrencies(r))
    }, [])

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.converter}>
                    <CurrencyConverter currencies={currencies} />
                </div>
                <div className={s.costs}>
                    <CurrencyCosts />
                </div>
                <div className={s.history}>
                    <CurrencyHistory />
                </div>
            </div>
        </div>
    );
};

export default ConverterPage;
import {FC, useEffect, useState} from "react";
import s from "pages/Converter/Converter.module.scss";
import CurrencyConverter from "components/ConverterComponents/CurrencyConverter/CurrencyConverter.tsx";
import CurrencyCosts from "components/ConverterComponents/CurrencyCosts/CurrencyCosts.tsx";
import CurrencyHistory from "components/ConverterComponents/CurrencyHistory/CurrencyHistory.tsx";
import {Currency} from "@/types/Currency.ts";
import {fetchAllCurrencies} from "@/api/currencyApi.ts";

const Converter: FC = () => {

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

export default Converter;
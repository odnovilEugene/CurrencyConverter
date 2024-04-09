import s from "components/ConverterPage/CurrencyConverter/CurrencyConverter.module.scss"
import {useState} from "react";

const CurrencyConverter = () => {

    const currencies: string[] = [
        "RUB",
        "USD",
        "EUR",
        "VAL",
        "PES"
    ]

    const [first, setFirst] = useState<string>(currencies[0])
    const [second, setSecond] = useState<string>(currencies[1])


    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.firstCurrency}>
                    <select
                        defaultValue={first}
                        onChange={e => setFirst(e.target.value)}>
                        {currencies?.map((currency: string, index) => (
                            currency !== second &&
                            <option value={currency} key={index.toString()}>{currency}</option>))}
                    </select>
                    <input defaultValue={1} type="text" />
                </div>
                <div className={s.secondCurrency}>
                    <input defaultValue={1} type="text" />
                    <select
                        defaultValue={second}
                        onChange={e => setSecond(e.target.value)}>
                        {currencies?.map((currency: string, index) => (
                            currency !== first &&
                            <option value={currency} key={index.toString()}>{currency}</option>))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
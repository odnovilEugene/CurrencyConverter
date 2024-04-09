import s from "components/ConverterPage/CurrencyConverter/CurrencyConverter.module.scss"
import React, {useState} from "react";
import {Currency} from "@/type/Currency.ts";

const CurrencyConverter = ({
   currencies
}: {
    currencies: Currency[]
}) => {

    const [first, setFirst] = useState<string>(currencies[0]?.code ?? '')
    const [second, setSecond] = useState<string>(currencies[1]?.code ?? '')

    type handleSelectProps = {
        e: React.ChangeEvent<HTMLSelectElement>;
        setState: React.Dispatch<React.SetStateAction<string>>;
    }
    const handleSelectCurrency = ({ e, setState } : handleSelectProps) => {
        if (e.target.value === first || e.target.value === second) {
            const temp = first
            setFirst(second)
            setSecond(temp)
        } else {
            setState(e.target.value)
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.firstCurrency}>
                    <select
                        value={first}
                        onChange={e => handleSelectCurrency({e, setState: setFirst})}>
                        {currencies &&
                            currencies?.map((currency: Currency, index) => (
                                <option value={currency.code} key={index.toString()}>{currency.code}</option>
                            ))
                        }
                    </select>
                    <input defaultValue={1} type="text" />
                </div>
                =
                <div className={s.secondCurrency}>
                    <input defaultValue={1} type="text" />
                    <select
                        value={second}
                        onChange={e => handleSelectCurrency({e, setState: setSecond})}>
                        {currencies &&
                            currencies?.map((currency: Currency, index) => (
                                <option value={currency.code} key={index.toString()}>{currency.code}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
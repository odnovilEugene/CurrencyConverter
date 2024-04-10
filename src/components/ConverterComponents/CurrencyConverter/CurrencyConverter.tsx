import s from "components/ConverterComponents/CurrencyConverter/CurrencyConverter.module.scss"
import {Currency} from "@/types/Currency.ts";
import {useUnit} from "effector-react";
import { $currencyFrom, $currencyTo, currencyFromSelected, currencyToSelected } from "@/store/selectStore.ts";
import {$valueFrom, $valueTo, valueFromChanged, valueToChanged} from "@/store/inputStore.ts";

const CurrencyConverter = ({
   currencies
}: {
    currencies: Currency[]
}) => {

    const [currencyFrom, currencyTo] = useUnit([$currencyFrom, $currencyTo])
    const [handleSelectFrom, handleSelectTo] = useUnit([currencyFromSelected, currencyToSelected])

    const [valueFrom, valueTo] = useUnit([$valueFrom, $valueTo])
    const [handleInputFrom, handleInputTo] = useUnit([valueFromChanged, valueToChanged])

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.currencyBlock}>
                    <select
                        value={currencyFrom.code}
                        onChange={(e) => {

                            const currency: Currency = {
                                code: e.target.value
                            }

                            handleSelectFrom(currency)
                        }}
                        >
                        {currencies &&
                            currencies?.map((currency: Currency, index) => (
                                <option value={currency.code} key={index.toString()}>{currency.code}</option>
                            ))
                        }
                    </select>
                    <input
                        value={valueFrom}
                        pattern="[0-9]+([\.,][0-9]+)?"
                        min="0"
                        onChange={(e) => handleInputFrom(e.target.valueAsNumber)}
                        type="number"
                    />
                </div>
                =
                <div className={s.currencyBlock}>
                    <input
                        value={valueTo}
                        pattern="[0-9]+([\.,][0-9]+)?"
                        min="0"
                        onChange={(e) => handleInputTo(e.target.valueAsNumber)}
                        type="number" />
                    <select
                        value={currencyTo.code}
                        onChange={(e) => {

                            const currency: Currency = {
                                code: e.target.value
                            }

                            handleSelectTo(currency)
                        }}
                        >
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
import s from "components/Converter/CurrencyConverter/CurrencyConverter.module.scss"
import {Currency} from "types/Currency.ts";
import {useUnit} from "effector-react";
import {
    $currencyFrom,
    $currencyTo,
    currencyFromSelected,
    currencyToSelected,
    setSwitched
} from "@/store/currency.ts";
import {$valueFrom, $valueTo, valueFromInputChanged, valueToInputChanged,} from "@/store/value.ts";
import CurrencyInput from "components/Converter/CurrencyConverter/CurrencyInput/CurrencyInput.tsx";
import {$rate}from "@/store/rate.ts";
import CurrencySelect from "components/Converter/CurrencyConverter/CurrencySelect/CurrencySelect.tsx";
import {GoArrowSwitch} from "react-icons/go";
import {clsx} from "clsx";
import {useState} from "react";

const CurrencyConverter = ({
    currencies,
}: {
    currencies: Currency[],
}) => {

    const [currencyFrom, setCurrencyFrom] = useUnit([$currencyFrom, currencyFromSelected])
    const [currencyTo,  setCurrencyTo] = useUnit([$currencyTo, currencyToSelected])

    const [valueFrom, handleInputFrom] = useUnit([$valueFrom, valueFromInputChanged ])
    const [valueTo, handleInputTo] = useUnit([$valueTo, valueToInputChanged])

    const [rotate, setRotate] = useState<boolean>(false)

    const rate = useUnit($rate)

    const handleSwitch = () => {
        setRotate((prev) => !prev)
        setSwitched(true)
        currencyFromSelected(currencyTo)
        currencyToSelected(currencyFrom)
        handleInputFrom(valueTo)
        handleInputTo(valueFrom)
    }

    const handleSelectFrom = (currency: Currency) => {
        if (currency.code === currencyTo.code) {
            handleSwitch()
        } else {
            setSwitched(false)
            setCurrencyFrom(currency)
        }
    }

    const handleSelectTo = (currency: Currency) => {
        if (currency.code === currencyFrom.code) {
            handleSwitch()
        } else {
            setSwitched(false)
            setCurrencyTo(currency)
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.currencyBlock}>
                    <div className={s.controllers}>
                        <CurrencySelect currency={currencyFrom}
                                        currencies={currencies}
                                        handleSelect={handleSelectFrom}
                        />
                        <CurrencyInput
                            value={valueFrom}
                            valueSelected={handleInputFrom}
                        />
                    </div>
                    <div className={s.rateToOne}>
                        {`1 ${currencyFrom.code} = ${(rate).toFixed(2)} ${currencyTo.code}`}
                    </div>
                </div>
                <div className={clsx(s.switchContainer, rotate ? s.rotate : '')}>
                    <GoArrowSwitch
                        className={s.switch}
                        onClick={handleSwitch}
                    />
                </div>
                <div className={s.currencyBlock}>
                    <div className={s.controllers}>
                        <CurrencyInput
                            value={valueTo}
                            valueSelected={handleInputTo}
                        />
                        <CurrencySelect currency={currencyTo}
                                        currencies={currencies}
                                        handleSelect={handleSelectTo}
                        />
                    </div>
                    <div className={s.rateToOne}>
                        {`1 ${currencyTo.code} = ${(1 / rate).toFixed(2)} ${currencyFrom.code}`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
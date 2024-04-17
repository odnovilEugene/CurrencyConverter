import s from "components/Converter/CurrencyConverter/CurrencySelect/CurrencySelect.module.scss";
import {Currency} from "types/Currency.ts";
import { ChangeEvent, FC, useRef, useState } from 'react';
import {clsx} from "clsx";
import {useOutsideClick} from "@/hooks/useOutsideClick.ts";


const CurrencySelect: FC<{
    currency: Currency,
    currencies: Currency[]
    handleSelect: (currency: Currency) => void
}> = ({
    currency,
    currencies,
    handleSelect
}) => {

    const divRef = useRef(null)

    const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false)
    const [currenciesToShow, setCurrenciesToShow] = useState<Currency[]>(currencies)
    useOutsideClick(divRef, () => setIsOptionsVisible(false))

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const foundCurrencies = currencies.filter((value) =>
            value.code.slice(0, e.target.value.length) === e.target.value
        )

        if (foundCurrencies !== currenciesToShow)
            setCurrenciesToShow(foundCurrencies)
    }

    return (
        <div className={s.wrapper} ref={divRef}>
            <div
                className={s.currency}
            >
                {isOptionsVisible
                    ?
                    <input
                        autoFocus
                        placeholder={currency.code}
                        className={s.searchBox}
                        onChange={handleSearch}
                        onFocus={() => setCurrenciesToShow(currencies)}
                        type='text'
                    />
                    :
                    <h3 className={s.optionTitle}
                        onClick={() => setIsOptionsVisible(true)}
                    >
                        {currency.code}
                    </h3>
                }
            </div>
            <div className={clsx(s.options, !isOptionsVisible && s.hide)}>
                {
                    currenciesToShow.map((item: Currency, index) => {

                        return (
                            <div
                                className={s.option}
                                onClick={() => {
                                    handleSelect(item)
                                    setIsOptionsVisible(false)
                                }}
                                key={index.toString()}
                            >
                                {item.code}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default CurrencySelect;
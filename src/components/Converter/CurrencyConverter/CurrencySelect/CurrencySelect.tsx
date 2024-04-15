import s from "components/Converter/CurrencyConverter/CurrencySelect/CurrencySelect.module.scss";
import {Currency} from "types/Currency.ts";
import {FC, useRef, useState} from "react";
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

    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [currenciesToShow, setCurrenciesToShow] = useState<Currency[]>(currencies)

    useOutsideClick(divRef, () => setShowOptions(false))

    return (
        <div className={s.wrapper} ref={divRef}>
            <div
                className={s.currency}
            >
                {showOptions
                    ?
                    <input
                        autoFocus
                        placeholder={currency.code}
                        className={s.searchBox}
                        onChange={(e) => {
                            const foundCurrencies = currencies.filter((value) =>
                                value.code.slice(0, e.target.value.length) === e.target.value
                            )

                            if (foundCurrencies !== currenciesToShow)
                                setCurrenciesToShow(foundCurrencies)
                        }}
                        onFocus={() => setCurrenciesToShow(currencies)}
                        type='text'
                    />
                    :
                    <h3
                        onClick={() => setShowOptions(true)}
                    >
                        {currency.code}
                    </h3>
                }
            </div>
            <div className={clsx(s.options, !showOptions && s.hide)}>
                {
                    currenciesToShow.map((item: Currency, index) => {

                        return (
                            <div
                                className={s.option}
                                onClick={() => {
                                    handleSelect(item)
                                    setShowOptions(false)
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
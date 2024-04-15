import s from "components/Converter/CurrencyCosts/CurrencyCosts.module.scss"
import {useUnit} from "effector-react/effector-react.umd";
import {$rate} from "@/store/rate.ts";
import {$currencyFrom, $currencyTo} from "@/store/currency.ts";
import {FC} from "react";
import {Currency} from "types/Currency.ts";

const units = [1, 5, 10, 25, 50, 100, 500, 1000, 5000]

const UnitItem: FC<{
    item: number,
    rate: number
    currencyFrom: Currency,
    currencyTo: Currency
}> = ({
    item,
    rate,
    currencyFrom,
    currencyTo
}) => {

    const value = Number(Number(item * rate).toFixed(2));

    return (
        <div className={s.unitItem}>
            <div className={s.currencyFrom}>
                {`${item} ${currencyFrom.code}`}
            </div>
            <div className={s.currencyTo}>
                {`${value} ${currencyTo.code}`}
            </div>
        </div>
    )
}

const CurrencyCosts = () => {

    const rate = useUnit($rate)

    const [currencyFrom, currencyTo] = useUnit([$currencyFrom, $currencyTo])

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.title}>
                    <h2>Rates</h2>
                </div>
                <div className={s.currencyCosts}>
                    <div className={s.converter}>
                        <div className={s.titles}>
                            <h3>{currencyFrom.code}</h3>
                            <h3>{currencyTo.code}</h3>
                        </div>
                        <div className={s.rateList}>
                            {units?.map((item, index) => (
                                <UnitItem
                                    item={item}
                                    rate={rate}
                                    currencyFrom={currencyFrom}
                                    currencyTo={currencyTo}
                                    key={index.toString()}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={s.converter}>
                        <div className={s.titles}>
                            <h3>{currencyTo.code}</h3>
                            <h3>{currencyFrom.code}</h3>
                        </div>
                        <div className={s.rateList}>
                            {units?.map((item, index) => (
                                <UnitItem
                                    item={item}
                                    rate={1 / rate}
                                    currencyFrom={currencyTo}
                                    currencyTo={currencyFrom}
                                    key={index.toString()}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyCosts;
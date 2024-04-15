import {FC} from 'react';
import s from "components/Converter/CurrencyConverter/CurrencyInput/CurrencyInput.module.scss"

type Props = {
    value: number,
    valueSelected: (payload: number) => number,
}

const CurrencyInput: FC<Props> = ({
    value,
    valueSelected,
}) => {

    return (
        <input
            className={s.input}
            value={value}
            pattern="[0-9]+([\.,][0-9]+)?"
            min="0"
            onChange={(e) => {
                if (!isNaN(e.target.valueAsNumber))
                    valueSelected(e.target.valueAsNumber)
            }}
            onBlur={() => {
                if (isNaN(value))
                    valueSelected(0)
            }}
            type="number"
        />
    );
};

export default CurrencyInput;
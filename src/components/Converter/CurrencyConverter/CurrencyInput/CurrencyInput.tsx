import {ChangeEvent, FC, useEffect, useState} from 'react';
import s from "components/Converter/CurrencyConverter/CurrencyInput/CurrencyInput.module.scss"
import { validateInput } from '@/utils/validateInput.ts';

type Props = {
    value: number,
    valueSelected: (payload: number) => number,
}

const CurrencyInput: FC<Props> = ({
    value,
    valueSelected,
}) => {

    const [localValue, setLocalValue] = useState('0')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const validatedInput = validateInput(event.target.value)

        if (validatedInput === '') {
            setLocalValue('')
            valueSelected(0)
        } else {
            setLocalValue(validatedInput)
            valueSelected(parseFloat(validatedInput))
        }
    }

    const handleBlur = () => {
        if (localValue.trim() === '') {
            setLocalValue('0')
            valueSelected(0)
        }
    }

    useEffect(() => {
        if (value === 0 && localValue !== '') {
            setLocalValue('0')
        } else {
            setLocalValue(value.toString())
        }
    }, [value])

    return (
        <input
            className={s.input}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
        />
    );
};

export default CurrencyInput;
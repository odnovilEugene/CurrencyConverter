import {ChangeEvent, FC, useEffect, useState} from 'react';
import s from "components/Converter/CurrencyConverter/CurrencyInput/CurrencyInput.module.scss"

type Props = {
    value: number,
    valueSelected: (payload: number) => number,
}

const CurrencyInput: FC<Props> = ({
    value,
    valueSelected,
}) => {

    const [localValue, setLocalValue] = useState<string>('0')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value

        inputValue = inputValue.replace(/[^0-9.,]/g, '')

        inputValue = inputValue.replace(',', '.')

        if (inputValue.indexOf('.') === 0) {
            inputValue = '0' + inputValue
        }

        if (/^0[0-9]/.test(inputValue)) {
            inputValue = inputValue.substr(1)
        }

        const dotIndex = inputValue.indexOf('.')
        const commaIndex = inputValue.indexOf(',')

        if (dotIndex !== -1 && commaIndex !== -1) {
            inputValue = inputValue.replace(',', '')
        }

        if (inputValue.indexOf('.') !== inputValue.lastIndexOf('.')) {
            inputValue = inputValue.slice(0, -1)
        }

        if (inputValue === '') {
            setLocalValue('')
            valueSelected(0)
        } else {
            setLocalValue(inputValue)
            valueSelected(parseFloat(inputValue))
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
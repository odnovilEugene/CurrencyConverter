export const validateInput = (input: string) => {
    let inputValue = input

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

    return inputValue
}
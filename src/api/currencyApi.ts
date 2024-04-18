import axios from 'axios'
import {Currency} from "@/types/Currency.ts";

const env = await import.meta.env
const apiKey = env.VITE_CURRENCY_API_KEY

const baseUrl = `https://api.freecurrencyapi.com/v1/`
export const getAllCurrencies = async () => {

    if (apiKey == undefined) {
        throw new Error("CURRENCY_API_KEY is not defined in .env")
    }

    const url = `${baseUrl}currencies?apikey=${apiKey}&currencies=`

    const response = await axios.get(url)
    if (response.data && response.data.data) {
        return Object.values(response.data.data) as Currency[]
    }
    return []
}

export const getCurrencyRate = async (from: Currency, to: Currency) => {

    if (apiKey == undefined) {
        throw new Error("CURRENCY_API_KEY is not defined in .env")
    }


    const url = `${baseUrl}latest?apikey=${apiKey}&currencies=${to.code}&base_currency=${from.code}`

    const response = await axios.get(url)
    if (response.data && response.data.data) {
        const exchangeRate = response.data.data[to.code]
        return exchangeRate !== undefined ? exchangeRate : null
    }

    return null
}


// all available api's made this feature paid


// export const getCurrencyHistory = async (from: Currency, to: Currency, days: number) => {
//
//     if (apiKey == undefined) {
//         throw new Error("CURRENCY_API_KEY is not defined in .env")
//     }
//
//     const today = new Date()
//     today.setDate(today.getDate() - 1)
//
//     // const dateTo = today.toISOString().slice(0, 10)
//
//     const daysAgo = new Date()
//     daysAgo.setDate(today.getDate() - days + 1)
//     const dateFrom = daysAgo.toISOString().slice(0, 10)
//
//     const url = (date: Date) => `${baseUrl}historical?apikey=${apiKey}&currencies=${to.code}&base_currency=${from.code}&date=${date}`
//
//     // const responses
//
//     for (let i = 0; i < days; i++) {
//
//     }
//
//     const response = await axios.get(url)
//     const historyData = response.data?.data
//
//     if (!historyData) {
//         return []
//     }
//
//     const historyArray: CurrencyDateRate[] = Object.entries(historyData).map(([date, currencies]) => ({
//         date,
//         rateFromTo: parseFloat((currencies as Record<string, number>)[to.code].toFixed(8))
//     }))
//
//     return historyArray
// }


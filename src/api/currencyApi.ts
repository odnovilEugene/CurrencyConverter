import axios from 'axios'
import {Currency} from "@/type/Currency.ts";

const apiKey: string | undefined = import.meta.env.VITE_CURRENCY_API_KEY

const baseUrl = `https://api.currencyapi.com/v3/`

export const fetchAllCurrencies = async () => {

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
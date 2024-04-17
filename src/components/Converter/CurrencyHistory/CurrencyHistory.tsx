import s from "components/Converter/CurrencyHistory/CurrencyHistory.module.scss"
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {FC} from "react";
import { CurrencyDateRate} from "types/Currency.ts";

type ChartData = CurrencyDateRate & {
    day: string
}

const CurrencyHistory: FC<{
    history: CurrencyDateRate[]
}> = ({
    history
}) => {

    const chartData: ChartData[] = history?.map((item): ChartData => {
        return {
            ...item,
            day: item.date.slice(-2)
        }
    })

    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.title}>
                    <h2>Chart</h2>
                </div>
                <div className={s.chart}>
                    <ResponsiveContainer aspect={16 / 9}>
                        <LineChart
                            data={chartData}>
                            <XAxis/>
                            <YAxis
                                domain={['auto', 'auto']}
                            />
                            <Tooltip />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CurrencyHistory;
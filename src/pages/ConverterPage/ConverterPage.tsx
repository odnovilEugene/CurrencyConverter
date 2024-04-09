import { FC } from "react";
import s from "pages/ConverterPage/ConverterPage.module.scss";
import CurrencyConverter from "components/ConverterPage/CurrencyConverter/CurrencyConverter.tsx";

const ConverterPage: FC = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.converter}>
                    <CurrencyConverter />
                </div>
            </div>
        </div>
    );
};

export default ConverterPage;
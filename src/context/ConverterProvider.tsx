import {ConverterContext, RatesObject} from "../types/types";
import React, {ReactNode, useState} from "react";


export const converterContext = React.createContext<ConverterContext>({
    selectedCurrencies: [],
    plnValue: 1.0,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedCurrencies: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    convertValue: () => {}
})

interface ProviderProps {
    children: ReactNode
}
const ConverterProvider = ({children}:ProviderProps) => {
    const [selectedCurrencies, setSelectedCurrencies] = useState<RatesObject[]>([]);
    const [plnValue , setPlnValue] = useState<number>(1.0);
    const convertValue = (value: number, mid:number) => {
        const newPlnValue = value / mid;
        setPlnValue(newPlnValue);
    }

    const value:ConverterContext = {
        selectedCurrencies,
        plnValue,
        setSelectedCurrencies,
        convertValue
    }
    return <converterContext.Provider value={value}>{children}</converterContext.Provider>
}
export default ConverterProvider
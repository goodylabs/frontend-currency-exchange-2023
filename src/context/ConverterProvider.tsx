import {RatesObject} from "../types/types";
import React, {ReactNode, useState} from "react";

export type ConverterContext = {
    selectedCurrencies: RatesObject[],
    setSelectedCurrencies: (value: (((prevState: RatesObject[]) => RatesObject[]) | RatesObject[])) => void
}
export const converterContext = React.createContext<ConverterContext>({
    selectedCurrencies: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedCurrencies: () => {}
})

interface ProviderProps {
    children: ReactNode
}
const ConverterProvider = ({children}:ProviderProps) => {
    const [selectedCurrencies, setSelectedCurrencies] = useState<RatesObject[]>([]);

    const value:ConverterContext = {
        selectedCurrencies,
        setSelectedCurrencies
    }
    return <converterContext.Provider value={value}>{children}</converterContext.Provider>
}
export default ConverterProvider
import React, { useEffect, useState } from "react";
import {GoldsWithGrowth} from "../types/types";
import {useLoaderData} from "react-router-dom";
import {goldEntries} from "../pages/GoldPage";

type ProviderProps = {
    children: React.ReactNode;
};

export type GoldContext = {
    goldWithGrowth: GoldsWithGrowth[];
    calcGrowth: (todayValue: number, yesterdayValue: number) => string;
};

export const goldContext = React.createContext<GoldContext>({
    goldWithGrowth: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    calcGrowth: (todayValue, yesterdayValue) => {}
} as GoldContext);
const GoldProvider = ({ children}: ProviderProps) => {
    const loaderData = useLoaderData() as goldEntries;
    const [entriesWithGrowth, setEntriesWithGrowth] = useState<GoldsWithGrowth[]>([]);
    console.log(loaderData);
    const calcGrowth = (todayValue: number, yesterdayValue: number): string => {
        const result = (todayValue * 100) / yesterdayValue;
        return (result - 100).toFixed(2);
    };
    const entriesPreprocessing = () =>{
        let updatedEntries:GoldsWithGrowth[] = [];
        for (let i = 0; i < loaderData.length; i++) {
            if(i > 0){
                updatedEntries.push({...loaderData[i], growth: calcGrowth(loaderData[i].cena,loaderData[i-1].cena)})
            }
            else{
                updatedEntries.push({...loaderData[i], growth: "0.00"})
            }
        }
        updatedEntries = updatedEntries.reverse();
        setEntriesWithGrowth(updatedEntries);
    }
    useEffect(() => {
        entriesPreprocessing();
    }, [])

    const value = {
        goldWithGrowth: entriesWithGrowth,
        calcGrowth,
    } as GoldContext;

    return <goldContext.Provider value={value}>{children}</goldContext.Provider>;
};

export default GoldProvider;

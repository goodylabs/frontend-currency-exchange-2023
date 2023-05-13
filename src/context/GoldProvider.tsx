import React, {useEffect, useState} from "react";
import {GoldsWithGrowth} from "../types/types";
import {useLoaderData} from "react-router-dom";
import {goldEntries} from "../pages/GoldPage";

type ProviderProps = {
    children: React.ReactNode;
    data: goldEntries
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
const GoldProvider = ({children, data}: ProviderProps) => {
    const loaderData = useLoaderData() as goldEntries;
    const [entriesWithGrowth, setEntriesWithGrowth] = useState<GoldsWithGrowth[]>(data as  GoldsWithGrowth[]);
    const calcGrowth = (todayValue: number, yesterdayValue: number): string => {
        const result = (todayValue * 100) / yesterdayValue;
        return (result - 100).toFixed(3);
    };
    const entriesPreprocessing = () =>{
        let updatedEntries:GoldsWithGrowth[] = [];
        for (let i = 0; i < loaderData.length; i++) {
            if(i > 0){
                updatedEntries.push({...data[i], growth: calcGrowth(data[i].cena,data[i-1].cena)})
            }
            else{
                updatedEntries.push({...data[i], growth: "0.00"})
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

export type tableAResponse = {
    table: string,
    no: string,
    effectiveDate: Date,
    rates: RatesObject[]
}
export type RatesObject = {
    currency: string,
    code: string,
    mid: number
}
export type GoldsWithGrowth = {
    data: Date,
    cena: number,
    growth: string
}
export type ConverterContext = {
    selectedCurrencies: RatesObject[],
    plnValue: number,
    setSelectedCurrencies: (value: (((prevState: RatesObject[]) => RatesObject[]) | RatesObject[])) => void,
    convertValue: (value: number, mid: number) => void
}
export type GoldContext = {
    goldWithGrowth: GoldsWithGrowth[];
    calcGrowth: (todayValue: number, yesterdayValue: number) => unknown;
};
export type LastExchangeData = {
    table: string,
    currency: string,
    code: string,
    rates: {
        no: string,
        effectiveDate: Date,
        mid: number
    }[]
}
export type goldEntries = {data: Date, cena: number}[]

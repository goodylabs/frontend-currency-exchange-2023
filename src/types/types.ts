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

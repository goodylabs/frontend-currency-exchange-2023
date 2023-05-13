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

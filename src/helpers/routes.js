const serverUrl = 'http://api.nbp.pl/api/exchangerates/tables'
const currUrl = 'http://api.nbp.pl/api/exchangerates/rates/A/'

export const currencyUrl = code =>
code ? `${currUrl}/${code}/` : `${serverUrl}/A/`

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import routes from '../common/routes';

const headers = ['Waluta', 'Kod', 'Średni kurs (PLN)', ''];

const CurrenciesTable = ({ data }) => (
  <table className="text-md w-full overflow-hidden rounded-xl text-left text-zinc-500 dark:text-gray-400">
    <thead className="bg-indigo-500 tracking-wide text-white">
      <tr>
        {headers.map((header) => (
          <th key={header} scope="col" className="px-8 py-4">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.rates.map((rate) => (
        <tr key={rate.code} className="h-16 bg-white transition even:bg-zinc-50 hover:bg-zinc-200">
          <th
            scope="row"
            className="whitespace-nowrap px-8 font-medium text-zinc-900 first-letter:uppercase"
          >
            {rate.currency}
          </th>
          <td className="px-8">{rate.code}</td>
          <td className="px-8">{rate.mid}</td>
          <td className="px-8" align="right">
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/0 text-zinc-500 transition hover:bg-indigo-500 hover:text-white"
              to={`${routes.currency}/${rate.code}`}
            >
              <ArrowRightIcon className="h-6 w-6" />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CurrenciesTable;

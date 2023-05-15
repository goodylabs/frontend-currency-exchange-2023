import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Fragment } from 'react';

const CurrencySelect = ({ data, value, onChange }) => (
  <Listbox value={value} onChange={onChange}>
    <div className="relative">
      <Listbox.Button className="relative h-12 w-full cursor-default rounded-xl border-2 bg-white pl-4 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
        <span
          className={clsx(
            'block truncate first-letter:uppercase',
            !value?.currency && 'text-zinc-500',
          )}
        >
          {value?.currency ?? 'Wybierz walutę'}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-zinc-500" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="nc-900/10 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {data.map((rate) => (
            <Listbox.Option
              key={rate.code}
              className={({ active }) =>
                clsx(
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                  active ? 'bg-indigo-100 text-indigo-900' : 'text-zinc-500',
                )
              }
              value={rate}
            >
              {({ selected }) => (
                <>
                  <span
                    className={clsx(
                      'block truncate first-letter:uppercase',
                      selected ? 'font-semibold text-zinc-900' : 'font-normal',
                    )}
                  >
                    {rate.currency}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-500">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
);

export default CurrencySelect;

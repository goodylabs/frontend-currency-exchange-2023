import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Currency } from "@typedefs/common";
import { includesWithWhitespaceCaseIgnore, useDebounce } from "@utils";
import { FC, Fragment, useMemo, useState } from "react";

type CurrencyComboboxProps<T> = {
  value: T;
  onChange: (param: T) => void;
  options: T[];
  disabled?: boolean;
};

export const CurrencyCombobox: FC<CurrencyComboboxProps<Currency>> = ({
  onChange,
  options,
  value,
  disabled,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const opts = useMemo(
    () =>
      options.filter(
        ({ code, name }) =>
          includesWithWhitespaceCaseIgnore(name, debouncedSearchQuery) ||
          includesWithWhitespaceCaseIgnore(code, debouncedSearchQuery)
      ),
    [debouncedSearchQuery, options]
  );

  return (
    <Combobox
      value={value}
      onChange={onChange}
      as={"div"}
      className="relative text-sm text-text-light-200 ui-disabled:text-bg-light-400"
      disabled={disabled}
    >
      <div className="flex h-fit w-fit items-center rounded-lg bg-bg-light-200 font-semibold transition-colors ui-disabled:border ui-disabled:border-bg-light-200 ui-disabled:bg-bg-light-100">
        <Combobox.Input
          onChange={(e) => setSearchQuery(e.target.value)}
          displayValue={(selected: Currency) => selected.code}
          className="bg-transparent px-3 py-2 outline-none focus-visible:text-text-light-900"
        />
        <Combobox.Button className="py-2 pl-2 pr-1 ui-open:text-text-light-900">
          <ChevronUpDownIcon className="w-5" />
        </Combobox.Button>
      </div>
      <Transition
        as={Fragment}
        afterLeave={() => setSearchQuery("")}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        enter="transition ease-out duration-100"
      >
        <Combobox.Options className="absolute max-h-80 translate-y-2 overflow-y-scroll rounded-lg border border-bg-light-300 bg-bg-light-200 px-3 py-2 font-medium">
          {opts.map((option) => (
            <Combobox.Option
              value={option}
              key={option.id}
              className="cursor-pointer rounded-md p-2 text-text-light-600 transition-colors hover:bg-bg-light-300 hover:text-text-light-900 ui-selected:bg-text-light-900 ui-selected:text-white"
            >
              <span className="mr-1 inline-block w-8 text-xs font-bold text-text-light-100">
                {option.code}
              </span>
              {option.name}
            </Combobox.Option>
          ))}
          {opts.length === 0 && <p>No matching currencies found.</p>}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

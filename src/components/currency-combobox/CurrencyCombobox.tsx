import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Currency } from "@typedefs/common";
import { includesWithWhitespaceCaseIgnore, useDebounce } from "@utils";
import { FC, useMemo, useState } from "react";

type CurrencyComboboxProps<T> = {
  value: T;
  onChange: (param: T) => void;
  options: T[];
};

export const CurrencyCombobox: FC<CurrencyComboboxProps<Currency>> = ({
  onChange,
  options,
  value,
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
      className="relative text-sm text-text-light-100"
    >
      <div className="flex h-fit w-fit items-center rounded-lg bg-bg-light-200 font-semibold transition-colors">
        <Combobox.Input
          onChange={(e) => setSearchQuery(e.target.value)}
          displayValue={(selected: Currency) => selected.name}
          className="bg-transparent px-3 py-2 outline-none "
        />
        <Combobox.Button className="py-2 pl-2 pr-1 ui-open:text-text-light-900">
          <ChevronUpDownIcon className="w-5" />
        </Combobox.Button>
      </div>
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
      </Combobox.Options>
    </Combobox>
  );
};

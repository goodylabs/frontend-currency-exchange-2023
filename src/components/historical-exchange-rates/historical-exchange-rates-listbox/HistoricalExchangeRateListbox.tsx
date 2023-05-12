import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Currency } from "@typedefs/common";
import { FC } from "react";

type HistoricalExchangeRateListboxProps = {
  onChange: (v: Currency) => void;
  value: Currency;
  options: Currency[];
};

export const HistoricalExchangeRateListbox: FC<
  HistoricalExchangeRateListboxProps
> = ({ onChange, value, options }) => {
  return (
    <Listbox
      value={value}
      onChange={onChange}
      as={"div"}
      className="relative text-sm text-text-light-100"
    >
      <Listbox.Button className="flex h-fit w-fit items-center gap-1 rounded-lg bg-bg-light-200 py-2 pl-3 pr-1 font-semibold transition-colors hover:bg-bg-light-300 hover:text-text-light-900 ui-open:bg-bg-light-300 ui-open:text-text-light-900">
        {value.name}
        <ChevronDownIcon className="w-5 transition-transform ui-open:rotate-180" />
      </Listbox.Button>
      <Listbox.Options className="absolute right-0 max-h-80 w-48 translate-y-2 overflow-y-scroll rounded-lg border border-bg-light-300 bg-bg-light-200 px-3 py-2 font-medium">
        {options.map((opt) => (
          <Listbox.Option
            value={opt}
            key={opt.id}
            className="cursor-pointer rounded-md p-2 transition-colors hover:bg-bg-light-300 hover:text-text-light-900"
          >
            {opt.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

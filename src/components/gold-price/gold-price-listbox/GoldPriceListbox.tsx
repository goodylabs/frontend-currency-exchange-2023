import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { GoldPriceListboxOption } from "@typedefs/api/gold-price";
import { FC } from "react";

type GoldPriceListboxProps = {
  onChange: (v: GoldPriceListboxOption) => void;
  value: GoldPriceListboxOption;
  options: GoldPriceListboxOption[];
};

export const GoldPriceListbox: FC<GoldPriceListboxProps> = ({
  onChange,
  value,
  options,
}) => {
  return (
    <Listbox
      value={value}
      onChange={onChange}
      as={"div"}
      className="relative text-sm text-text-light-200"
    >
      <Listbox.Button className="flex h-fit w-fit items-center gap-1 rounded-lg bg-bg-light-200 py-2 pl-3 pr-1 font-semibold transition-colors hover:bg-bg-light-300 hover:text-text-light-900 ui-open:bg-bg-light-300 ui-open:text-text-light-900">
        {value.name}
        <ChevronDownIcon className="w-5 transition-transform ui-open:rotate-180" />
      </Listbox.Button>
      <Listbox.Options className="absolute right-0 z-10 w-40 translate-y-2 rounded-lg border border-bg-light-300 bg-bg-light-200 px-3 py-2 font-medium">
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

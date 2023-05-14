export type GoldPrice = {
  data: string;
  cena: number;
};

export type GoldPriceResponse = Array<GoldPrice>;

export type GoldPriceListboxOption = {
  id: number;
  name: string;
  value: number;
};

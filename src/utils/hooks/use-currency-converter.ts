import { useEffect, useState } from "react";

export function useCurrencyConverter(mid: number | undefined) {
  const [reversed, setReversed] = useState(false);
  const [valuePLN, setValuePLN] = useState<string>("");
  const [value, setValue] = useState<string>("0");

  useEffect(() => {
    if (mid) {
      if (!reversed) {
        setValue((Number(valuePLN) / mid).toFixed(2));
      } else {
        setValuePLN((Number(value) * mid).toFixed(2));
      }
    }
  }, [valuePLN, value, reversed, mid]);

  return { valuePLN, value, setReversed, setValue, setValuePLN };
}

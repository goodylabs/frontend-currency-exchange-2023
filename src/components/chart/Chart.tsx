import { ChartType, DefaultDataPoint } from "chart.js";
import {
  ChartProps,
  TypedChartComponent,
} from "node_modules/react-chartjs-2/dist/types";

type ChartJSProps<TDefaultType extends ChartType> = {
  component: TypedChartComponent<TDefaultType>;
} & Omit<
  ChartProps<TDefaultType, DefaultDataPoint<TDefaultType>, unknown>,
  "type"
>;

export const Chart = <TDefaultType extends ChartType>({
  component: Component,
  ...props
}: ChartJSProps<TDefaultType>) => {
  return (
    <div className="relative aspect-[2/1] h-auto w-full">
      <Component className="!w-full" {...props} />
    </div>
  );
};

import { useSelector } from "react-redux";

import { highChartsOptions, highMapsOptions } from "../utils/highOptions";

import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";

const Metrics = () => {
  const {
    metrics: { data, loading, error },
  } = useSelector((state) => state);

  let chartOptions, mapOptions;
  data !== null &&
    (() => {
      const { metrics, countries } = data;
      chartOptions = highChartsOptions(metrics);
      mapOptions = highMapsOptions(countries);
    })();

  return (
    <div>
      <h2>Site Metrics</h2>
      {data !== null && (
        <>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          <HighchartsReact
            highcharts={HighMaps}
            constructorType={"mapChart"}
            options={mapOptions}
          />
        </>
      )}
    </div>
  );
};

export default Metrics;

import { useSelector } from "react-redux";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Metrics = () => {
  const {
    metrics: { data, loading, error },
  } = useSelector((state) => state);

  console.log(data);
  let load, times, options, countries;
  data !== null &&
    (() => {
      countries = {};
      data
        .map((metric) => metric.countries)
        .forEach((list) => {
          list.forEach((item) => {
            const { country, requests } = item;
            if (countries.hasOwnProperty(country)) {
              countries[item.country] += Number(item.requests);
            } else {
              countries[item.country] = 0;
              countries[item.country] += Number(item.requests);
            }
          });
        });

      console.log(countries);

      load = data
        .map((metric) => metric.visits.map((visit) => visit.load))
        .flat(1)
        .sort();
      times = data
        .map((metric) =>
          metric.visits.map((visit) =>
            new Date(visit.time * 1000)
              .toISOString()
              .replace(/[a-zA-Z]/g, " ")
              .slice(0, 16)
          )
        )
        .flat(1)
        .sort();
      options = {
        chart: {
          type: "spline",
        },
        title: {
          text: "Website requests in bytes of over time",
        },
        subtitle: {
          text: "measured by sum of bytes grouped by requests made to the home page, on an hourly basis",
        },
        xAxis: [
          {
            categories: times,
          },
        ],
        series: [
          {
            name: "sum bytes per hour",
            data: load,
          },
        ],
      };
    })();

  return (
    <div>
      <h2>Site Metrics</h2>
      {data !== null && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default Metrics;

import { useSelector } from "react-redux";

import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import worldMap from "@highcharts/map-collection/custom/world-lowres.geo.json";

const Metrics = () => {
  const {
    metrics: { data, loading, error },
  } = useSelector((state) => state);

  console.log(data);
  let load, times, splineOptions, countries, mapOptions;
  data !== null &&
    (() => {
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
      splineOptions = {
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

      countries = {};
      data
        .map((metric) => metric.countries)
        .forEach((list) => {
          list.forEach((item) => {
            const { country, requests } = item;
            const lowerForMap = country.toLowerCase();
            if (countries.hasOwnProperty(lowerForMap)) {
              countries[lowerForMap] += Number(requests);
            } else {
              countries[lowerForMap] = 0;
              countries[lowerForMap] += Number(requests);
            }
          });
        });
      const entries = Object.entries(countries);

      mapOptions = {
        chart: {
          map: worldMap,
        },
        title: {
          text: "Website requests per country",
        },
        subtitle: {
          text: "measured by request ids per country",
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: "spacingBox",
          },
        },
        colorAxis: {
          min: 0,
        },
        series: [
          {
            name: "Requests",
            states: {
              hover: {
                color: "#BADA55",
              },
            },

            data: entries,
          },
        ],
      };
    })();

  return (
    <div>
      <h2>Site Metrics</h2>
      {data !== null && (
        <>
          {" "}
          <HighchartsReact highcharts={Highcharts} options={splineOptions} />
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

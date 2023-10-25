import worldMap from "@highcharts/map-collection/custom/world-lowres.geo.json";

export const highMapsOptions = (countries) => {
  const filter_countries = {};
  Object.keys(countries).forEach((country) => {
    const mb = Number((countries[country] / 1000000).toFixed(2));

    if (mb > 0) {
      filter_countries[country.toLowerCase()] = mb;
    }
  });

  const entries = Object.entries(filter_countries);

  const mapOptions = {
    chart: {
      map: worldMap,
    },
    title: {
      text: "Website traffic per country",
    },
    subtitle: {
      text: "measured by sum of megabytes per AWS Edgepoint access to website",
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

  return mapOptions;
};

export const highChartsOptions = (metrics) => {
  const load = metrics.map((arr) => {
    const mb = arr.server_load / 1000000;
    return Number(mb.toFixed(2));
  });

  const dates = metrics.map((dict) => dict.query_date.substring(0, 7));

  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Website requests in megabytes",
    },
    subtitle: {
      text: "measured by sum of megabytes grouped by month, to all websites URIs",
    },
    xAxis: [
      {
        categories: dates,
      },
    ],
    series: [
      {
        name: "megabytes",
        data: load,
      },
    ],
  };

  return chartOptions;
};

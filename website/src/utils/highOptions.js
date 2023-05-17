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
  const sorted = [...metrics].sort((a, b) => a.query_date - b.query_date);

  const load = sorted.map((arr) => {
    const mb = arr.server_load / 1000000;
    return Number(mb.toFixed(2));
  });

  const times = sorted
    .map((arr) => arr.query_date)
    .map((time) =>
      new Date(time * 1000)
        .toISOString()
        .replace(/[a-zA-Z]/g, " ")
        .slice(0, 10)
    );

  const chartOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Website requests in megabytes of over time",
    },
    subtitle: {
      text: "measured by sum of megabytes grouped by date, to all websites URIs",
    },
    xAxis: [
      {
        categories: times,
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

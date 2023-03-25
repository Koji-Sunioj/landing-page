import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { highChartsOptions, highMapsOptions } from "../utils/highOptions";

import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

const Metrics = () => {
  const {
    metrics: { data, loading },
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
      <Row>
        <Col lg="6">
          <h2>Site Metrics</h2>
          <p>
            AWS records view requests, including properties such as{" "}
            <Link to="https://aws.amazon.com/cloudfront/features/?whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc#Global_Edge_Network">
              edge point location
            </Link>
            , a unique request ID, date and other HTTP header attributes
            (cookies excluded). I developed a Lamda function that measure daily
            logs files through Athena, saves the raw data in CSV format to a
            bucket where another lambda is triggered - then aggregating the raw
            results with Python, depositing the minified results in DynamoDB
            which is displayed here on the website.
          </p>
          <p>
            Heavy computation of log metrics is offloaded to Athena and Python
            once a day, allowing the website to display visitor statistics with
            as little memory load as possible. Log files are automatically
            deleted after 3 days.
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <Spinner animation="grow" variant="primary" size="lg" />
            </div>
          )}
          {data !== null && (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          )}
        </Col>
        <Col lg="6">
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <Spinner animation="grow" variant="primary" size="lg" />
            </div>
          )}
          {data !== null && (
            <HighchartsReact
              highcharts={HighMaps}
              constructorType={"mapChart"}
              options={mapOptions}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Metrics;

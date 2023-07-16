import { portfolio } from "../utils/data";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

const Portfolio = ({ mode }) => {
  return (
    <>
      <Row className="mb-2">
        <h2>My currently hosted apps:</h2>
        {portfolio.map((item) => {
          const { url, github, title, image, description } = item;
          return (
            <Col lg={6} className="mb-3" key={title}>
              <Card bg={mode}>
                <Card.Body>
                  <Link to={url}>
                    <Card.Img src={image} className="mb-2" />
                  </Link>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle className="mb-2">
                    Repository: <Link to={github}>{github}</Link>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2">
                    Live address: <Link to={url}>{url}</Link>
                  </Card.Subtitle>
                  <Card.Text>{description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <h3>
          My full repository can be accessed{" "}
          <Link to={"https://github.com/Koji-Sunioj/"}>here</Link>{" "}
        </h3>
      </Row>
    </>
  );
};

export default Portfolio;

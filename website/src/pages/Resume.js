import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { skills, experiences, education } from "../utils/data.js";

const Resume = () => (
  <>
    <Row className="mb-2">
      <Col lg={6}>
        <h2>Skills and interests</h2>
        <Card>
          <Card.Body>
            {skills.map((skill) => {
              const { type, value } = skill;
              return (
                <Button
                  variant={type}
                  size="md"
                  key={value}
                  style={{
                    pointerEvents: "none",
                    margin: "2px",
                  }}
                >
                  {value}
                </Button>
              );
            })}
          </Card.Body>
        </Card>
      </Col>
      <Col lg={6}>
        <h2>Education and certifications</h2>
        <Card>
          {education.map((item) => {
            const { place, description, date } = item;
            return (
              <Card.Body key={place}>
                <Card.Title>{place}</Card.Title>
                <Card.Subtitle className="text-muted">{date}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
              </Card.Body>
            );
          })}
        </Card>
      </Col>
    </Row>
    <Row className="mb-2">
      <h2 className="mb-3">Work History</h2>
      <Col>
        <Card>
          <Card.Body>
            <ul className="timeline">
              {experiences.reverse().map((item, n) => {
                const { name, location, title, date, description } = item;
                const liClass =
                  n + 1 === experiences.length
                    ? "timeline-item mb-2"
                    : "timeline-item mb-5";
                return (
                  <li className={liClass} key={n}>
                    <h5 className="fw-bold">{name}</h5>
                    <p className="fw-bold mb-2">{location}</p>
                    <p className="text-muted mb-2 fw-bold">
                      {date}: {title}
                    </p>
                    <p>{description}</p>
                  </li>
                );
              })}
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </>
);

export default Resume;

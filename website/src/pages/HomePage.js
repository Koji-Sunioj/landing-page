import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import { skills, experiences } from "../utils/data.js";

const HomePage = () => {
  const imgStyle = {
    height: "250px",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
    display: "block",
  };

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <h1>Hello there</h1>
          <p>
            My name is Koji Inoue, a Software Developer with many interests and
            skills to offer you and your organization. Scroll down for more
            information.
          </p>
        </Col>
      </Row>
      <Row className="mb-2">
        <h2>I am a...</h2>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="dev.png" style={imgStyle} />
            <Card.Body>
              <Card.Title>Website Developer</Card.Title>
              <Card.Text>
                Achieving a certification in{" "}
                <Link to="https://www.integrify.io/">
                  Full Stack Web Development
                </Link>
                , I enjoy creating web applications using modern front end
                frameworks such as React.js, and back end using Python or
                Node.js - powered by the cloud. My style is simple and sleek,
                with a good understanding of CSS and HTML.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="db.png" style={imgStyle} />
            <Card.Body>
              <Card.Title>Cloud Enthusiast</Card.Title>
              <Card.Text>
                Acquired the{" "}
                <Link to="https://aws.amazon.com/certification/certified-cloud-practitioner/">
                  AWS Cloud Practitioner
                </Link>{" "}
                certification, laying the foundation for learning to deploy
                infrastructure via code. Incorporating AWS resources like
                Cognito, Api Gateway, S3, Lambda and provisioned SQL or NoSQL
                databases with full stack apps is my current passion.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="cs.png" style={imgStyle} />
            <Card.Body>
              <Card.Title>Client Advocate</Card.Title>
              <Card.Text>
                Having just over ten years of experience in client facing
                positions. From serving in a{" "}
                <Link to="https://daattravel.com/">
                  well-established Israeli tour company
                </Link>{" "}
                to a{" "}
                <Link to="https://www.oreillyauto.com/">
                  nationally recognized auto parts retailer in the United States
                </Link>{" "}
                - my mindsight is client focused in any role, providing great
                user satisfaction.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6}>
          <h2>Skills</h2>
          <Card>
            <Card.Body>
              {skills.map((skill) => (
                <Button
                  variant={skill.type}
                  size="md"
                  key={skill.value}
                  style={{
                    pointerEvents: "none",
                    margin: "2px",
                  }}
                >
                  {skill.value}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h2>Education and certifications</h2>
          <Card>
            <Card.Body>
              <Card.Title>Integrify Full Stack Development Academy</Card.Title>
              <Card.Subtitle className="text-muted">
                April 2022 - August 2022
              </Card.Subtitle>
              <Card.Text>
                An intensive course teaching full stack web development with
                React.js, Typescript, MonogoDB and Node.js. The course also
                covered AWS Cloud Practicioner topics.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Title>Amazon Cloud Practicioner</Card.Title>
              <Card.Subtitle className="text-muted">
                September 2022
              </Card.Subtitle>
              <Card.Text>
                Official certification demonstrating knowledge of AWS Services,
                cloud computing, and terminology related to cloud
                infrastructure.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Title>
                Haaga-Helia University of Applied Sciences
              </Card.Title>
              <Card.Subtitle className="text-muted">
                January 2017 - November 2020
              </Card.Subtitle>
              <Card.Text>
                Degree in Information Technology, including subjects such as
                User Experience, Database Development, Front End Development and
                Business Intelligence.
              </Card.Text>
            </Card.Body>
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
    </Container>
  );
};

export default HomePage;

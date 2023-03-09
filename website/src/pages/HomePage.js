import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { skills, summaries, skillsPointer, imgStyle } from "../utils/data.js";

const HomePage = () => {
  const skillSums = ["primary", "info", "warning", "danger"].map((label) => {
    const sum = skills
      .filter((skill) => skill.type === label)
      .reduce((n) => {
        return n + 1;
      }, 0);

    return { type: skillsPointer[label], total: sum };
  });

  return (
    <>
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
        {summaries.map((summary) => {
          const { photo, title, content } = summary;
          return (
            <Col lg={4} className="mb-3" key={title}>
              <Card>
                <Card.Img variant="top" src={photo} style={imgStyle} />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row className="mb-2">
        <h2>In summary, I have skills in... </h2>
        {skillSums.map((sum) => (
          <p key={sum.type}>
            <strong>{sum.total}</strong> {sum.type}
          </p>
        ))}
        <p>
          and many other interpersonal, client facing or team building skills!
        </p>
      </Row>
    </>
  );
};

export default HomePage;

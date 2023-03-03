import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

const HomePage = () => {
  const imgStyle = {
    height: "250px",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "contain",
    display: "block",
  };

  const data = [
    {
      location: "Jerusalem, Israel",
      date: "2006",
      name: "IDT Global",
      title: "Billing Associate",
      description:
        "Resolving billing issues for clients regarding their internet service. \
            Up-selling service packages, offers to customers. \
            Providing the best service for client experiences.",
    },
    {
      location: "Jerusalem, Israel",
      date: "2007",
      name: "Lion Data Processing",
      title: "Data Entry Clerk",
      description:
        "Posting of real estate sales on state and national listing services. \
              Follow up of client inquiries and concerns regarding details of property. \
              Tailoring the property listing to maximize attraction of potential buyers.",
    },
    {
      location: "Jerusalem, Israel",
      date: "2008-2009",
      name: "FXCM",
      title: "Operation's Associate",
      description:
        "Auditing and authorizing applications of foreign exchange trading accounts. \
              Processing deposits, withdrawals and funds transfers for clients. \
              Sustaining relations between traders, account brokers and salespeople.",
    },
    {
      location: "Springfield MO, USA",
      date: "2010",
      name: "Greene County Assessor",
      title: "Data Entry Clerk",
      description:
        "Scanning tax assessments for funds allocation to proper taxing districts. \
              Appraising value of Greene County residents' property (i.e. cars, livestock). \
              Categorizing collected mail for preparation of data entry.",
    },

    {
      location: "Springfield MO, USA",
      date: "2010-2011",
      name: "O'reilly Auto Parts",
      title: "Special Order Clerk",
      description:
        "Expediting and guiding shipments of automotive products to store. \
              Completing stock requests for customers inquiring on specialty items. \
              Maintaining vendor rapport between client and manufacturer.",
    },
    {
      location: "Jerusalem, Israel",
      date: "2012",
      name: "Alorica",
      title: "Universal Agent",
      description:
        "Completing installation orders for new customers. \
              Fixing bill or general account related issues. \
              Updating customers on most current products and promotions available.",
    },
    {
      location: "Jerusalem, Israel",
      date: "2013-2015",
      name: "Bible Lands Jerusalem",
      title: "Front Desk Associate",
      description:
        "Meeting, greeting and explaining features of museum to customers. \
              Completion of membership, tickets, and event purchases. \
              Coordination of group visits, guided tours and planning. ",
    },
    {
      location: "Jerusalem, Israel",
      date: "2014-2016",
      name: "Da'at Educational Expeditions",
      title: "Customer Service Center Supervisor",
      description:
        "Supervising and delegating inquiries among peers. \
         Registering, customizing, and completing reservations for \
         tour packages to Israel and Europe. Processing Travel Documents,\
         E-tickets and account invoices to secure client bookings",
    },
    {
      location: "Helsinki, Finland",
      date: "2017-2018",
      name: "Fafa's",
      title: "Cook",
      description:
        "Serving customers. \
        Cleaning dining environment. \
        Preparing food",
    },
    {
      location: "Vantaa, Finland",
      date: "2018-2022",
      name: "Ikea",
      title: "Logistic's Co-Worker",
      description:
        "Collecting items for online Ikea orders. \
      Handling outbound shipments of client orders. \
      Multi-cultural communications and team work emphasis",
    },
    {
      location: "Helsinki, Finland",
      date: "2022",
      name: "Integrify",
      title: "Full Stack Developer Trainee",
      description:
        "Developing front end apps with React.js, HTML, CSS. \
        Creating back end application via Node.js, Express. \
        Schema design and database administration with MongoDB.",
    },
    {
      location: "Helsinki, Finland",
      date: "2022-2023",
      name: "Nordcloud",
      title: "Junior Software Developer",
      description:
        "Training with AWS development, such as AWS CDK and Amplify. \
        Learning to provision resources for front end, such as S3, Cognito. \
        Combining REST API with AWS Lambda, Api Gateway, provisioned NoSQL and SQL services",
    },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h1>Hello there</h1>
          <p>
            My name is Koji Inoue, a Software Developer with many interests,
            skills to offer you and your organization. Scroll down for more
            information.
          </p>
        </Col>
      </Row>
      <Row>
        <h2 className="mb-3">Skills</h2>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="cs.png" style={imgStyle} />
            <Card.Body>
              <Card.Title>Customer Service</Card.Title>
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
                - I enjoy providing great service and following through with
                requests until resolved (and beyond).
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="dev.png" style={imgStyle} />
            <Card.Body>
              <Card.Title>Website Development</Card.Title>
              <Card.Text>
                Achieved a certification in both{" "}
                <Link to="https://www.integrify.io/">
                  Full Stack Web Development
                </Link>{" "}
                and{" "}
                <Link to="https://aws.amazon.com/certification/certified-cloud-practitioner/">
                  AWS Cloud Practitioner
                </Link>
                . I enjoy creating web applications using modern front end
                frameworks such as React.js, and back end using Python or
                Node.js with services like Cognito, Api Gateway provisioned by
                AWS.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card>
            <Card.Img variant="top" src="db.png" style={imgStyle} />
            <Card.Body>
              <Card.Title>Analytics and Databases</Card.Title>
              <Card.Text>
                Acquiring skills in Business Intelligence and SQL Development
                from{" "}
                <Link to="https://www.haaga-helia.fi/en/degree-programme-business-information-technology">
                  Haaga-Helia UAS
                </Link>{" "}
                - I like crunching data using Python libraries such as Numpy or
                Pandas and developing schemas for database engines such as
                Microsoft SQL, Postgres, MySQL and NoSQL (DynamoDB, MonogDB).
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <h2 className="mb-3">Work History</h2>
        <Col>
          <ul className="timeline">
            {data.reverse().map((item) => {
              return (
                <li className="timeline-item mb-5">
                  <h5 className="fw-bold">{item.name}</h5>
                  <p className="fw-bold mb-2">{item.location}</p>
                  <p className="text-muted mb-2 fw-bold">
                    {item.date}: {item.title}
                  </p>
                  <p>{item.description}</p>
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;

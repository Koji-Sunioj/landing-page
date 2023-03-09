export const imgStyle = {
  height: "250px",
  marginLeft: "auto",
  marginRight: "auto",
  objectFit: "contain",
  display: "block",
};

export const skillsPointer = {
  primary: "back end and general programming languages",
  info: "databases engines and analytical methods or frameworks",
  warning: "front end scripting languages and frameworks",
  danger: "cloud and general IT system tools",
  success: "team building and communications",
};

export const portfolio = [
  {
    url: "https://magnificent-mochi-99378f.netlify.app/",
    github: "https://github.com/Koji-Sunioj/fs10-frontend-public",
    image: "commerce.png",
    title: "E-commerce app",
    description:
      "My first front end project with Integrify Oy, learning the conventions of " +
      "combining React.js, Typescript and Redux with Api calls. The project required that several " +
      "features be implemented, such as searching through the data, paginating, changing the color theme " +
      "mobile friendly viewing and a toolbar",
  },
  {
    url: "https://d1yh66sadgwb8n.cloudfront.net/",
    github: "https://github.com/Koji-Sunioj/cdk-workshop",
    image: "albums.png",
    title: "Photo albums website",
    description:
      "Something I whipped up while learning full stack development with cloud " +
      "at Nordcloud. Uses deployment of a React build to a Cloudfront " +
      "Distribution, Api calls through Api Gateway, Lambda, DynamoDB for " +
      "CRUD actions, Cognito authentication and S3 to create photo albums. The resources were provisioned with AWS CDK",
  },
];

export const education = [
  {
    place: "Integrify Full Stack Development Academy",
    date: "April 2022 - August 2022",
    description:
      "An intensive course teaching full stack web development with " +
      "React.js, Typescript, MonogoDB and Node.js. The course also " +
      "covered AWS Cloud Practicioner topics.",
  },
  {
    place: "Amazon Cloud Practicioner",
    date: "September 2022",
    description:
      "Official certification demonstrating knowledge of AWS Services, " +
      "cloud computing, and terminology related to cloud infrastructure.",
  },
  {
    place: "Haaga-Helia University of Applied Sciences",
    date: "January 2017 - November 2020",
    description:
      "Degree in Information Technology, including subjects such as " +
      "User Experience, Database Development, Front End Development and Business Intelligence.",
  },
];

export const experiences = [
  {
    location: "Helsinki, Finland",
    date: "2022-2023",
    name: "Nordcloud",
    title: "Junior Software Developer",
    description:
      "Training with AWS development, such as AWS CDK and Amplify. " +
      "Learning to provision resources for front end, such as S3, Cognito. " +
      "Combining REST API with AWS Lambda, Api Gateway, provisioned NoSQL and SQL services",
  },
  {
    location: "Helsinki, Finland",
    date: "2022",
    name: "Integrify",
    title: "Full Stack Developer Trainee",
    description:
      "Developing front end apps with React.js, HTML, CSS. " +
      "Creating back end application via Node.js, Express. " +
      "Schema design and database administration with MongoDB.",
  },
  {
    location: "Vantaa, Finland",
    date: "2018-2022",
    name: "Ikea",
    title: "Logistic's Co-Worker",
    description:
      "Collecting items for online Ikea orders. " +
      "Handling outbound shipments of client orders. " +
      "Multi-cultural communications and team work emphasis",
  },
  {
    location: "Helsinki, Finland",
    date: "2017-2018",
    name: "Fafa's",
    title: "Cook",
    description:
      "Serving customers. " +
      "Cleaning dining environment. " +
      "Preparing food",
  },
  {
    location: "Jerusalem, Israel",
    date: "2014-2016",
    name: "Da'at Educational Expeditions",
    title: "Customer Service Center Supervisor",
    description:
      "Supervising and delegating inquiries among peers. " +
      "Registering, customizing, and completing reservations for " +
      "tour packages to Israel and Europe. Processing Travel Documents, " +
      "E-tickets and account invoices to secure client bookings",
  },
  {
    location: "Jerusalem, Israel",
    date: "2013-2015",
    name: "Bible Lands Jerusalem",
    title: "Front Desk Associate",
    description:
      "Meeting, greeting and explaining features of museum to customers. " +
      "Completion of membership, tickets, and event purchases. " +
      "Coordination of group visits, guided tours and planning. ",
  },
  {
    location: "Lafayette IN, USA",
    date: "2012",
    name: "Alorica",
    title: "Universal Agent",
    description:
      "Completing installation orders for new customers. " +
      "Fixing bill or general account related issues. " +
      "Updating customers on most current products and promotions available.",
  },
  {
    location: "Springfield MO, USA",
    date: "2010-2011",
    name: "O'reilly Auto Parts",
    title: "Special Order Clerk",
    description:
      "Expediting and guiding shipments of automotive products to store. " +
      "Completing stock requests for customers inquiring on specialty items. " +
      "Maintaining vendor rapport between client and manufacturer.",
  },
  {
    location: "Springfield MO, USA",
    date: "2010",
    name: "Greene County Assessor",
    title: "Data Entry Clerk",
    description:
      "Scanning tax assessments for funds allocation to proper taxing districts. " +
      "Appraising value of Greene County residents' property (i.e. cars, livestock). " +
      "Categorizing collected mail for preparation of data entry.",
  },
  {
    location: "Jerusalem, Israel",
    date: "2008-2009",
    name: "FXCM",
    title: "Operation's Associate",
    description:
      "Auditing and authorizing applications of foreign exchange trading accounts. " +
      "Processing deposits, withdrawals and funds transfers for clients. " +
      "Sustaining relations between traders, account brokers and salespeople.",
  },
  {
    location: "Jerusalem, Israel",
    date: "2007",
    name: "Lion Data Processing",
    title: "Data Entry Clerk",
    description:
      "Posting of real estate sales on state and national listing services. " +
      "Follow up of client inquiries and concerns regarding details of property. " +
      "Tailoring the property listing to maximize attraction of potential buyers.",
  },
  {
    location: "Jerusalem, Israel",
    date: "2006",
    name: "IDT Global",
    title: "Billing Associate",
    description:
      "Resolving billing issues for clients regarding their internet service. " +
      "Up-selling service packages, offers to customers. " +
      "Providing the best service for client experiences.",
  },
];

export const skills = [
  { type: "primary", value: "Node.js" },
  { type: "primary", value: "Express.js" },
  { type: "primary", value: "Python" },
  { type: "primary", value: "Flask" },
  { type: "primary", value: "Django" },
  { type: "primary", value: "C#" },
  { type: "primary", value: ".NET" },
  { type: "info", value: "Data Analytics" },
  { type: "info", value: "ETL" },
  { type: "info", value: "Numpy" },
  { type: "info", value: "Pandas" },
  { type: "info", value: "Postgres" },
  { type: "info", value: "MySQL" },
  { type: "info", value: "MS SQL" },
  { type: "info", value: "DynamoDB" },
  { type: "info", value: "MongoDB" },
  { type: "warning", value: "React.js" },
  { type: "warning", value: "Angular.js" },
  { type: "warning", value: "Jquery" },
  { type: "warning", value: "Javascript" },
  { type: "warning", value: "Typescript" },
  { type: "warning", value: "HTML" },
  { type: "warning", value: "CSS" },
  { type: "warning", value: "Bootstrap" },
  { type: "warning", value: "Tailwind" },
  { type: "warning", value: "SCSS" },
  { type: "danger", value: "Linux" },
  { type: "danger", value: "Git" },
  { type: "danger", value: "Bash" },
  { type: "danger", value: "Lambda" },
  { type: "danger", value: "Cognito" },
  { type: "danger", value: "S3" },
  { type: "danger", value: "AWS CDK" },
  { type: "danger", value: "Api Gateway" },
  { type: "danger", value: "Cloudfront" },
  { type: "danger", value: "Cloudformation" },
  { type: "danger", value: "EC2" },
  { type: "success", value: "Customer Service" },
  { type: "success", value: "Front Desk" },
  { type: "success", value: "Leadership" },
  { type: "success", value: "Intercultural Communication" },
  { type: "success", value: "Training" },
  { type: "success", value: "Team Work" },
];

export const summaries = [
  {
    photo: "4380747.jpg",
    title: "Website Developer",
    content:
      "Achieving a certification in " +
      '<a href="https://www.integrify.io/">Full Stack Web Development</a>,' +
      " I enjoy creating web applications using modern front end" +
      "frameworks such as React.js, and back end using Python or " +
      "Node.js - powered by the cloud. My style is simple and sleek," +
      "with a good understanding of CSS and HTML.",
  },
  {
    photo: "6551283.jpg",
    title: "Cloud Enthusiast",
    content:
      "Acquired the " +
      '<a href="https://aws.amazon.com/certification/certified-cloud-practitioner/">AWS Cloud Practitioner</a>' +
      " certification, laying the foundation for learning to deploy" +
      " infrastructure via code. Incorporating AWS resources like" +
      "Cognito, Api Gateway, S3, Lambda and provisioned SQL or NoSQL" +
      "databases with full stack apps is my current passion.",
  },

  {
    photo: "5124556.jpg",
    title: "Client Advocate",
    content:
      "Having just over ten years of experience in client facing positions. From serving in a " +
      '<a href="https://daattravel.com/">well-established Israeli tour company</a> ' +
      'to a <a href="https://www.oreillyauto.com/">nationally recognized auto parts retailer in the United States</a> ' +
      "- my mindsight is client focused in any role, providing great user satisfaction.",
  },
];

export const imgStyle = {
  height: "250px",
  marginLeft: "auto",
  marginRight: "auto",
  objectFit: "contain",
  display: "block",
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
      "CRUD actions, Cognito authentication and S3 to create photo albums. The resources were provisioned with AWS CDK. " +
      "I am currently refactoring it to use Typescript and Redux, then minifying the Lambda function code.",
  },

  /* {
    url: "https://darling-syrniki-58d723.netlify.app/",
    github: "https://github.com/Koji-Sunioj/fs14-frontend-public",
    image: "records.png",
    title: "E-commerce website",
    description:
      "A front end assignment I am currently working on, as part of re-joining the Integrify Academy. " +
      "It's main purpose to implement e-commerce functionalities, " +
      "such as logging in via Google single sign on, adding items to card and filtering through items. " +
      "Eventually, it will be supplement with a backend server.",
  }, */
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
    location: "Tampere, Finland",
    date: "2023",
    name: "Opentext",
    title: "Associate Consultant",
    description:
      "Creating and configuring EDI connections for clients. " +
      "Communicating with stakeholders and departments for follow ups, reporting. " +
      "Using Agile (Kanban) development practices to streamline tasks.",
  },
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
  {
    title: "Backend frameworks and general programming languages",
    description:
      "I am familiar and comfortable implementing REST APIs with various database types, conforming to conventions of HTTP responses and security via tokens, headers or other methods.",
    data: [
      "Node.js",
      "Express.js",
      "Python",
      "Flask",
      "Django",
      "C#",
      "AWS Lambda",
      ".NET",
      "Springboot",
      "Java",
    ],
  },
  {
    title: "Database management and analytics",
    description:
      "One of my focuses in Haaga-Helia was on Business Intelligence using various software. However, I taught myself Python during my thesis where I used it to show research data. Ever since, I have been very interest in exploring data, cleaning it and finding answers through data.",
    data: [
      "Data Analytics",
      "Numpy",
      "Matplotlib",
      "Pandas",
      "PostgreSQL",
      "MySQL",
      "Microsoft SQL",
      "DynamoDB",
      "MongoDB",
    ],
  },
  {
    title: "Front end programming and website design",
    description:
      "Learning Javascript in school, I have gone down the journey of learning to use modern frameworks. During my time at Integrify, I received a certification for learning to use more modern frameworks in larger codebases.",
    data: [
      "React.js",
      "Angular.js",
      "Jquery",
      "Javascript",
      "Typescript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind",
      "SCSS",
      "Leaflet.js",
    ],
  },
  {
    title: "System administration, devops and public cloud",
    description:
      "Aside from full stack programming, I have a strong interest in Linux systems and public cloud deployments of services, such as Amazon Web Services. I enjoy combining multiple resource types with AWS CDK in full stack applications.",
    data: [
      "Linux",
      "Git",
      "Bash",
      "Cognito",
      "S3",
      "AWS CDK",
      "Api Gateway",
      "Cloudfront",
      "Cloudformation",
      "EC2",
    ],
  },
  {
    title: "People and culture",
    description:
      "Over the years, I have worked in many job types. These positions have taught me about communication, creating expectations for clients and dealing with complex issues.",
    data: [
      "Customer Service",
      "Front Desk",
      "Leadership",
      "Intercultural Communication",
      "Training",
      "Team Work",
    ],
  },
];

export const summaries = [
  {
    photo: "4380747.jpg",
    title: "Software Developer",
    content:
      "I enjoy creating software and web applications using modern " +
      "frameworks such as React.js, and backend using Python or " +
      "Node.js - powered by the cloud. My style is simple and sleek," +
      "with a good understanding of CSS and HTML. I have a certification in AWS Cloud Practitioner and " +
      '<a href="https://www.integrify.io/">Full Stack Web Development</a> from Integrify.',
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

export const cssPointers = {
  dark: {
    "--font-color": "white",
    "--card-bg": "#212529",
    "--bg-color": "black",
  },
  light: {
    "--font-color": "black",
    "--card-bg": "#F8F9FA",
    "--bg-color": "white",
  },
};

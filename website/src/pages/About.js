const About = () => {
  return (
    <>
      <h2>This website...</h2>
      <p>
        Was created with React.js and AWS CDK, using a static website in S3
        served by Cloudfront, and routed to a custom domain through Route 53. It
        does not collect cookies.
      </p>
      <p>
        The photos on the homepage:{" "}
        <a href="https://www.freepik.com/free-vector/desktop-smartphone-app-development_10276838.htm#query=coding&position=12&from_view=search&track=sph">
          4380747.jpg
        </a>
        ,{" "}
        <a href="https://www.freepik.com/free-vector/flat-design-illustration-customer-support_12982910.htm#query=customer%20service&position=1&from_view=search&track=ais">
          6551283.jpg
        </a>
        , and{" "}
        <a href="https://www.freepik.com/free-vector/gradient-website-hosting-illustration_22112055.htm#page=2&query=cloud%20server&position=32&from_view=search&track=ais">
          5124556.jpg
        </a>{" "}
        are credited to Freepik.com.
      </p>
    </>
  );
};

export default About;

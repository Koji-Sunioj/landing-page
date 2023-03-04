import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Portfolio from "./pages/Portfolio";
import Resume from "./pages/Resume";
import Container from "react-bootstrap/Container";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/resume" element={<Resume />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

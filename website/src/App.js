import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import About from "./pages/About";
import Resume from "./pages/Resume";
import Metrics from "./pages/Metrics";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Portfolio from "./pages/Portfolio";
import Container from "react-bootstrap/Container";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMetrics } from "./app/reducers/metricsSlice";

function App() {
  const dispatch = useDispatch();
  const {
    metrics: { data, loading, error },
  } = useSelector((state) => state);

  useEffect(() => {
    if (data === null && !loading && !error) {
      dispatch(fetchMetrics());
    }
  }, [data]);

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/metrics" element={<Metrics />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/resume" element={<Resume />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

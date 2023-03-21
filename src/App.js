import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import NewProjects from "./components/pages/NewProject";

import Container from "./components/layout/Container";
import Navabar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";


function App() {
  return (
    <Router>
      <Navabar/>

      <Container customClass="min-height">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/company" element={<Company/>}/>
        <Route exact path="/projects" element={<Projects/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/newprojects" element={<NewProjects/>}/>
      </Routes>
      </Container>

      <Footer/>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router";
import RootLayout from "./RootLayout/RootLayout";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import CourseForm from "./Pages/CourseForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courseForm" element={<CourseForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

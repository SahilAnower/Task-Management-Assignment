import "./App.css";
import SignupSignIn from "./components/SignupSignIn";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTaskManagementStore } from "./store/store";
import PageNotFoundError from "./components/PageNotFoundError";

function App() {
  const isAuth = Boolean(useTaskManagementStore((state) => state.accessToken));
  return (
    <Router>
      <Routes>
        <Route exact path="/auth" element={<SignupSignIn />} />
        <Route
          exact
          path="/"
          element={isAuth ? <HomePage /> : <SignupSignIn />}
        />
        <Route path="*" element={<PageNotFoundError />} />
      </Routes>
    </Router>
  );
}

export default App;

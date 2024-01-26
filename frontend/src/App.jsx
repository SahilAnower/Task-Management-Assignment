import "./App.css";
import SignupSignIn from "./components/SignupSignIn";
import { VITE_API_URL } from "./Globals.js";

function App() {
  return (
    <>
      <SignupSignIn />
      {/* {"VITE_URL:" + VITE_API_URL} */}
    </>
  );
}

export default App;

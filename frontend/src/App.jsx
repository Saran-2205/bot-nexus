// App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppRoutes from "./AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-black text-white">
      <Router basename="/nexus-hq">
        <AppRoutes />
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
    </div>
  );
}

export default App;

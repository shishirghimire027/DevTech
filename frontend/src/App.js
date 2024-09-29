import { BrowserRouter, Routes, Route } from "react-router-dom";
import Career from "./pages/Career";
import Admin from "./pages/admin";


function App() {
  return (
    <div className="App">
      {/* Ensure BrowserRouter wraps all Routes */}
      <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<Career />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;

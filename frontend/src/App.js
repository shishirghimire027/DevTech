import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* Ensure BrowserRouter wraps all Routes */}
      <BrowserRouter>
     
        <Routes></Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;

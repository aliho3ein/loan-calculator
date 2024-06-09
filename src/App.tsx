import { Routes, Route } from "react-router-dom";
import { FamilyCalculate } from "./family-calcualte";
import { ManuelCalculate } from "./manuel-caculate";
import { Navbar } from "./navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ManuelCalculate />} />
        <Route path="family" element={<FamilyCalculate />} />
      </Routes>
    </>
  );
};

export default App;

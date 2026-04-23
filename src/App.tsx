import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollShell } from "./components/layout/ScrollShell";
import { CollaboratorsPage } from "./components/pages/CollaboratorsPage";
import { ThreeDPage } from "./components/pages/ThreeDPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/collaborators" element={<CollaboratorsPage />} />
        <Route path="/3d" element={<ThreeDPage />} />
        <Route path="/*" element={<ScrollShell />} />
      </Routes>
    </BrowserRouter>
  );
}

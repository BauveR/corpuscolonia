import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollShell } from "./components/layout/ScrollShell";
import { CollaboratorsPage } from "./components/pages/CollaboratorsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/collaborators" element={<CollaboratorsPage />} />
        <Route path="/*" element={<ScrollShell />} />
      </Routes>
    </BrowserRouter>
  );
}

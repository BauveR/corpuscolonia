import { BrowserRouter } from "react-router-dom";
import { ScrollShell } from "./components/layout/ScrollShell";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollShell />
    </BrowserRouter>
  );
}

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./index.css";
import Index from "./pages";
import RemotionVideo from "./pages/video";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/plugins" element={<Index />} />
        <Route path="/plugins/video" element={<RemotionVideo />} />
        <Route path="*" element={<Navigate to="/plugins" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

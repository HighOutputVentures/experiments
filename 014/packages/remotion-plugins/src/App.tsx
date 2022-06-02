import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./index.css";
import Index from "./pages/index";
import NotFound from "./pages/notfound";
import RemotionVideo from "./pages/video";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/plugins" replace />} />
        <Route path="/plugins" element={<Index />} />
        <Route path="/plugins/video" element={<RemotionVideo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

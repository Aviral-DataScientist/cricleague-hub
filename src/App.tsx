import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LeaguesPage from "./pages/LeaguesPage";
import LeagueDetailPage from "./pages/LeagueDetailPage";
import ComparisonPage from "./pages/ComparisonPage";
import NewsPage from "./pages/NewsPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leagues" element={<LeaguesPage />} />
            <Route path="/leagues/:id" element={<LeagueDetailPage />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

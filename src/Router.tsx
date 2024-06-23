import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ArticleList } from "./pages/articles/articleList";
import { ArticleDetail } from "./pages/articles/articleDetail";
import { NotFound } from "./pages/misc/notFound";
import { Header } from "./components/layout/Header";
import './App.css';

function Router() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="Routes">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/posts" element={<ArticleList />} />
            <Route path="/posts/latest" element={<ArticleList />} />
            <Route path="/posts/tech" element={<ArticleList type="Tech"/>} />
            <Route path="/posts/design" element={<ArticleList type="Movie"/>} />
            <Route path="/posts/business" element={<ArticleList type="Book"/>} />
            <Route path="/posts/esc" element={<ArticleList type="Game"/>} />
            <Route path="/posts/latest/:id" element={<ArticleDetail />} />
            <Route path="/posts/tech/:id" element={<ArticleDetail />} />
            <Route path="/posts/design/:id" element={<ArticleDetail />} />
            <Route path="/posts/business/:id" element={<ArticleDetail />} />
            <Route path="/posts/esc/:id" element={<ArticleDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Router

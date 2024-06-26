import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ArticleList } from "./pages/articles/articleList";
import { ArticleDetail } from "./pages/articles/articleDetail";
import { NotFound } from "./pages/misc/notFound";
import { Header } from "./components/layout/Header";
import './App.css';
import { PostsList } from "./pages/posts/postsList";
import { PostsDetail } from "./pages/posts/postsDetail";

function Router() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="Routes">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/:id" element={<PostsDetail/>} />
            <Route path="/notes" element={<ArticleList />} />
            <Route path="/notes/:id" element={<ArticleDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Router

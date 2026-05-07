import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home/Home";
import BaseLayout from "./components/layout/BaseLayout/BaseLayout";
import EditorView from "./pages/Editor/Editor";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BaseLayout>
              <HomePage />
            </BaseLayout>
          }
        />
        <Route
          path="/editor"
          element={
            <BaseLayout>
              <EditorView />
            </BaseLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

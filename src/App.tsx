import { Route, Routes } from "react-router-dom";
import MainPage from "@pages/main/MainPage";
import Layout from "@components/Layout";
import NotFoundPage from "@pages/NotFoundPage.tsx";
import LoginPage from "@pages/login/LoginPage.tsx";
import TestProfilePage from "@pages/test/TestProfilePage.tsx";

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/profile" element={<TestProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
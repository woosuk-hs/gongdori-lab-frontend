import { Route, Routes } from "react-router-dom";
import MainPage from "@pages/main/MainPage";
import Layout from "@components/Layout";
import NotFoundPage from "@pages/NotFoundPage.tsx";
import { CONFIG } from "@utils/config";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import LoginPage from "@pages/login/LoginPage.tsx";
import {useEffect} from "react";
import TestProfilePage from "@pages/test/TestProfilePage.tsx";

function App() {

  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot({ pluginKey: CONFIG.CHANNEL_API_KEY });
  }, []);


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
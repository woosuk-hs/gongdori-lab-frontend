import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout";
import PrivateRoute from "@components/PrivateRoute";
import MainPage from "@pages/main/MainPage";
import LoginPage from "@pages/login/LoginPage";
import RecruitPage from "@pages/recruit/RecruitPage";
import RecruitAdminPage from "@pages/recruit/RecruitAdminPage";
import NotFoundPage from "@pages/NotFoundPage";
import JoinPage from "@pages/join/JoinPage.tsx";
import ProfilePage from "@pages/profile/ProfilePage.tsx";
import ProfileEditPage from "@pages/profile/ProfileEditPage.tsx";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { CONFIG } from "@utils/config.ts";

function App() {

  ChannelService.loadScript()
  ChannelService.boot({ pluginKey: CONFIG.CHANNEL_KEY })

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recruit" element={<RecruitPage />} />
        <Route path="/join" element={<JoinPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
        </Route>

        <Route element={<PrivateRoute requireAdmin />}>
          <Route path="/recruit/admin" element={<RecruitAdminPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
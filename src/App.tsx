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
import RecruitCheckPage from "@pages/recruit/RecruitCheckPage.tsx";
import RecruitDonePage from "@pages/recruit/RecruitDonePage.tsx";
import RecruitDetailPage from "@pages/recruit/RecruitDetailPage.tsx";
import MemberAdminPage from "@pages/members/MemberAdminPage.tsx";
import MembersPage from "@pages/members/MembersPage.tsx";
import CodingTestPage from "@pages/recruit/CodingTestPage.tsx";

function App() {

  ChannelService.loadScript()
  ChannelService.boot({ pluginKey: CONFIG.CHANNEL_KEY })

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recruit/check" element={<RecruitCheckPage />} />
        <Route path="/recruit/done" element={<RecruitDonePage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/test" element={<CodingTestPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/members" element={<MembersPage />} />
        </Route>

        <Route element={<PrivateRoute requireAdmin />}>
          <Route path="/recruit" element={<RecruitPage />} />
          <Route path="/recruit/admin" element={<RecruitAdminPage />} />
          <Route path="/recruit/:studentId" element={<RecruitDetailPage />} />
          <Route path="/members/admin" element={<MemberAdminPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
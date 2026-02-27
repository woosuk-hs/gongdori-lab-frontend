import { Route, Routes } from "react-router-dom";
import MainPage from "@/pages/main/MainPage";
import Layout from "@components/Layout";

import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { CONFIG } from "@utils/config";

function App() {

  ChannelService.loadScript()

  ChannelService.boot({
    pluginKey: CONFIG.CHANNEL_API_KEY
  })

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
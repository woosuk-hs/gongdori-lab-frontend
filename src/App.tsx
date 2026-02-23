import {Route, Routes} from 'react-router-dom'
import MainPage from "@/pages/MainPage.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";

function App() {

  return (
      <>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
          </Route>
        </Routes>
      </>
  )
}

export default App

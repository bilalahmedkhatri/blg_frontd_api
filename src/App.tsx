import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeProvider } from './dashboard/theme/DarkMode';
import MainContainer from './dashboard/layout/DashBoard'
import LoginPage from './dashboard/auth/LoginPage';
import SignUpPage from './dashboard/auth/SignUpPage';

function App() {
  return (
    <ColorModeProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          {/* <Route path="/" element={<MainContainer />}>
          <Route index element={<MainContainer />} /> */}
          {/* <Container maxWidth="lg"> */}

          <Route path='login' element={<LoginPage />} />
          <Route path='sign-up' element={<SignUpPage />} />
          {/* <Route path="all-Post" element={<AllPost />} /> */}
          {/* <Route path="create-post" element={<CreatePost />} /> */}
          {/* <Route path="comments" element={<Comments />} /> */}
          {/* <Route path="tags-categories" element={<TagsCategories />} /> */}
          {/* <Route path="user-profile" element={<UserProfile />} /> */}
          {/* <Route path="setting" element={<settings />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  )
}

export default App

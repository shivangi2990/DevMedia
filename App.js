import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import Home from './pages/Home'
import AddPost from './pages/AddPost'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getallposts } from './redux/actions/postActions'
import { ProtectedRoute } from './components/ProtectedRoute'
import { getallusers } from './redux/actions/userActions'
import AllUsers from './pages/AllUsers'


function App() {
  const { loading,likeOrUnlikeLoading } = useSelector((state) => state.alertsReducer)
 
  const dispatch = useDispatch()
 useEffect(() =>{
  dispatch(getallposts())
  dispatch(getallusers())
 },[])
  return (
    <div className="App">
      {(loading || likeOrUnlikeLoading) && (
        <div className="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route element ={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />

        <Route path="/" element={<Home />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/profile/:userid" exact element={<Profile />} />

        <Route path="/allusers" element={<AllUsers />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

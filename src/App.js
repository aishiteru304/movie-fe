import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import HomeScreen from './Screens/HomeScreen'
import AboutUs from './Screens/AboutUs'
import ContactUs from './Screens/ContactUs'
import Movies from './Screens/Movies'
import SingleMovie from './Screens/SingleMovie'
import WatchPage from './Screens/WatchPage'
import FindMovie from './Screens/FindMovie'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Profile from './Screens/Dashboard/Profile'
import Password from './Screens/Dashboard/Password'
import FavoritesMovies from './Screens/Dashboard/FavoritesMovies'
import MoviesList from './Screens/Dashboard/Admin/MovieList';
import Users from './Screens/Dashboard/Admin/Users';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import NotFound from './Screens/NotFound'
import Aos from 'aos'
import "aos"
import "aos/dist/aos.css"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDataMovies } from './Redux/movieSlice'
import { useEffect } from 'react';
import { setDataUser } from './Redux/userSlice';
import { setDataFavorites } from './Redux/favoriteSlice';

function App() {
  Aos.init()
  const dispatch = useDispatch()

  const storageUser = JSON.parse(sessionStorage.getItem('user'))
  if (storageUser) dispatch(setDataUser(storageUser))

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/movies`)
      .then(res => dispatch(setDataMovies(res.data)))
      .catch(err => console.log(err))
  }, [dispatch])

  useEffect(() => {
    if (storageUser) {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/favorites`, {
        headers: {
          Authorization: `Bearer ${storageUser.token}` // Gửi token trong header Authorization
        }
      })
        .then(res => dispatch(setDataFavorites(res.data)))
        .catch(err => console.log(err))
    }
  }, [storageUser, dispatch])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/findmovie/:name" element={<FindMovie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Need login */}
        {storageUser && <Route path="/profile" element={<Profile />} />}
        {storageUser && <Route path="/password" element={<Password />} />}
        {storageUser && <Route path="/favorite" element={<FavoritesMovies />} />}

        {/* Admin section */}


        {storageUser && storageUser.isAdmin && <Route path="/movieslist" element={<MoviesList />} />}
        {storageUser && storageUser.isAdmin && <Route path="/users" element={<Users />} />}
        {storageUser && storageUser.isAdmin && <Route path="/dashboard" element={<Dashboard />} />}
        {storageUser && storageUser.isAdmin && <Route path="/addmovie" element={<AddMovie />} />}



        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

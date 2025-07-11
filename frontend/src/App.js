import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
// import HomeScreen from './screens/HomeScreen'


const App = () => {
  return (
    <>
    <Header />
    <main className='py-3'>
      <Container>
        {/* <h1>Welcome to ShopMall</h1> */}
        {/* <HomeScreen /> */}
        <Outlet />
      </Container>
    </main>
    <Footer />
    <ToastContainer />
    </>
  )
}

export default App
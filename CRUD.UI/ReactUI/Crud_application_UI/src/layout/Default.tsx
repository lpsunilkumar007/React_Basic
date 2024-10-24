
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
export default function Default() {
  return (
    <>
      {/* In header we have navBar */}
      <Header />
      {/* here we are using outlet compement from react-router-dom that is used to render the child element inside the parent element */}
      <Outlet />
      {/* In footer we have footer section */}
      <Footer />
    </>
  )
}

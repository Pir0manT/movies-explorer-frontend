import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Layout = ({ children, ...props }) => {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      {children}
      <Footer />
    </>
  )
}

export default Layout

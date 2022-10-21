import '../styles/globals.css'
import AdminLayout from '../components/admin_layout'

function Liveheats({ Component, pageProps, router }) {
  // if (router.pathname.startsWith('/admin')) {
  //   return (
  //     <AdminLayout>
  //       <Component {...pageProps} />
  //     </AdminLayout>
  //   )
  // }

  return <Component {...pageProps} />
}

export default Liveheats
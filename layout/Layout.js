import Head from 'next/head'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify' // donde se van a mostrar los toast
import Sidebar from '../components/Sidebar'
import ModalProducto from '../components/ModalProducto';
import useQuiosco from '../hooks/useQuiosco';

import 'react-toastify/dist/ReactToastify.css' // para los estilos

// styles de modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
// para montarlo en caso de next es id=__next (root en el caso de vite)(es donde se monta la aplicacion)
Modal.setAppElement('#__next'); // es el elemento principal 

export default function Layout({children, pagina}) {

    const { modal } = useQuiosco()
    return (
      <>
        <Head>
            <title>Café - {pagina}</title>
            <meta name="description" content="Quiosco Cafetería" />
        </Head>

        <div className="md:flex">
            <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
                <Sidebar />
            </aside>

            <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                <div className='p-10'>{children}</div>
            </main>
        </div>

        {modal && (
          <Modal isOpen={modal} style={customStyles}>
            <ModalProducto />
          </Modal>
        )} 

        {/* para registrar el toast donde se va a mostrar // en el laoyut porque se va a llamar en diferentes lugares*/}
        <ToastContainer /> 
      </>
    )
  }
import Head from 'next/head';
import Image from 'next/image';
// import { PrismaClient } from'@prisma/client';
import Layout from '../layout/Layout';
import useQuiosco from '../hooks/useQuiosco';

export default function Home() {

  const { categoriaActual } = useQuiosco()

  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
      </p>
    </Layout>
  )
}

// //consulta la base de datos con prisma y next
// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient()
  
//   // para que encuentre todas las categorias que hay en la bd
//   const categorias = await prisma.categoria.findMany();

//   // console.log(categorias)// en la parte del servidor
//   return {
//     props: {
//       categorias
//     }
//   }
// }

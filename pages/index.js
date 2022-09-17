import Head from 'next/head';
import Image from 'next/image';
// import { PrismaClient } from '@prisma/client';
import Layout from '../layout/Layout';

export default function Home() {
  return (
    <Layout>
      <h1>Inicio</h1>
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

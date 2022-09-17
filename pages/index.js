import Head from 'next/head';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';

export default function Home({categorias}) {
  console.log(categorias);// corre en la parte del cliente
  return (
    <h1>next.js</h1>
  )
}

//consulta la base de datos con prisma y next
export const getServerSideProps = async () => {
  const prisma = new PrismaClient()
  
  // para que encuentre todas las categorias que hay en la bd
  const categorias = await prisma.categoria.findMany();

  // console.log(categorias)// en la parte del servidor
  return {
    props: {
      categorias
    }
  }
}

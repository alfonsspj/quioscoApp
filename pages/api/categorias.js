import { PrismaClient } from "@prisma/client"
  
export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true, // trae los productos que pertenecen a esa categoria
    }
  })

  res.status(200).json(categorias)
}
// eagler loading - cargar todos los datos
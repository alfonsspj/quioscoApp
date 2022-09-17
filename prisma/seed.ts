import { categorias } from './data/categorias'
import { productos } from './data/productos'
import { PrismaClient } from '@prisma/client'
// para hacer una operacion en la bd


const prisma = new PrismaClient()

const main = async () : Promise<void> => {
    try {
        // insertar en la bd
        await prisma.categoria.createMany({
            data: categorias
        })
        await prisma.producto.createMany({
            data: productos
        })
        
    } catch (error) {
        console.log(error);
    }
}
main()
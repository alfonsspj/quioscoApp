import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import { formatearDinero } from '../helpers'

const ModalProducto = () => {
    const { producto, handleChangeModal } = useQuiosco()

  return (
    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <Image 
                width={300}
                height={400}
                alt={`imagen producto ${producto.nombre}`}
                src={`/assets/img/${producto.imagen}.jpg`}
            />
        </div>
        <div className="md:w-2/3">
            {/* x para cerrar el modal */}
            <div className='flex justify-end'>
                <button onClick={handleChangeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">

                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />

                    </svg>
                </button>
            </div>

            <h1 className='text-3xl font-bold text-5xl'> {producto.nombre} </h1>
            <p className='mt-5 font-black text-5xl text-amber-500'>
                {formatearDinero(producto.precio)}
            </p>
        </div>

    </div>
  )
}

export default ModalProducto
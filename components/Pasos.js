import { useRouter } from "next/router";
// import useQuiosco from "../hooks/useQuiosco"; // barra de progreso

const pasos = [
    {paso: 1, nombre: 'Menu', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'},
];

const Pasos = () => {
    // const { handleChangePaso } = useQuiosco(); // barra de progreso
    const router = useRouter()

    const calcularProgreso = () => {
        // esto es usando state pero al recargar se pierde el progreso actual (regresa a 1)
        // const porcentaje = (paso / 3) * 100
        // return porcentaje
        // return (paso / 3) * 100   // en una sola linea

        let valor
        if(router.pathname === "/"){
            valor = 2
        }else if(router.pathname === "/resumen") {
            valor = 50
        }else{
            valor = 100
        }
        return valor
    }

  return (
    <>
        <div className="flex justify-between mb-5">
            {pasos.map((paso) => (
                <button 
                    onClick={() => {
                        router.push(paso.url)
                        // handleChangePaso(paso.paso) // barra de progreso
                    }}
                    className="text-2xl font-bold" key={paso.paso}>{paso.nombre}</button>
            ))}
        </div>

        {/* contenedor */}
        <div className="bg-gray-100 mb-10">  
            {/* la barra que se va a ir llenando */}
            <div 
                className="rounded-full bg-amber-500 text-sx leading-none h-2 text-center text-white"
                style={{ width: `${calcularProgreso()}%` }}
            ></div>

        </div>
    </>
  )
}

export default Pasos
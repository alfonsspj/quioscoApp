import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify' // funcion que permite mandar a llamar el toast en ciertos eventos
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    // const [paso, setPaso] = useState(1) // por state barra de progreso
    const [nombre, setNombre] = useState('')

    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0]) // categoria por default o
    }, [categorias])

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id)
        // console.log(categoria) // trae todo el objeto de cafe
        setCategoriaActual(categoria[0])
        router.push('/')// en cualquier categoria, lleva hacia la pagina principal
    }

    // setear producto
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    // modal
    const handleChangeModal = () => {
        setModal(!modal)
    }

    // Agregar y actualizar pedidos
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        // verificar que el producto no este duplicado
        if(pedido.some(productoState => productoState.id === producto.id)){
            // Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)

            toast.success('Guardado Correctamente')
        }else {
            // hay que agregar
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }

        setModal(false)
    }

    // // barra de progreso
    // const handleChangePaso = paso => {
    //     setPaso(paso)
    // }


    // mostrar el modal desde un button - actualizar y eliminar
    const handleEditarCantidades = id => {
        // console.log(id)
        //sacar el producto con el id buscado
        const productoActualizar = pedido.filter( producto => producto.id === id)// el producto que se va a actualizar, selecciona uno y lo extrae

        setProducto(productoActualizar[0]) // retorna solo uno
        setModal(!modal)
    }
    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id) // va a sacarlo del arreglo
        setPedido(pedidoActualizado)
    }

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}
export {
    QuioscoProvider
}
export default QuioscoContext
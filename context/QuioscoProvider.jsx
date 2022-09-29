import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])

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
    const handleAgregarPedido = ({categoriaId, imagen, ...producto}) => {
        // verificar que el producto no este duplicado
        if(pedido.some(productoState => productoState.id === producto.id)){
            // Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
        }else {
            // hay que agregar
            setPedido([...pedido, producto])
        }

        setModal(false)
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
                pedido
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
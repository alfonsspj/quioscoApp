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
        setPedido([...pedido, producto])
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
                handleAgregarPedido
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
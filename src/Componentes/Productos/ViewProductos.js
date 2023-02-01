import React from 'react'

export const ViewProductos = ({ producto }) => {

    const { nombre, descripcion, stock, precio, imagen } = producto;

    return (

        <div className='border-r p-5 flex justify-between items-center'>
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-gray-50'>Nombre: {nombre}</p>
                <p className='mb-1 text-xl text-gray-50 uppercase'>descripción: {descripcion}</p>
                <p className='mb-1 text-xl text-gray-50'>Stock: {stock}</p>
                <p className='mb-1 text-xl text-gray-50'>Precio: {precio}</p>
                <img src={imagen} width="150" height="150"></img>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
                <button
                    className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg'
                //onClic={() =>}
                >
                    Editar
                </button>
                <button
                    className='bg-red-500 px-4 py-3 text-white uppercase font-bold rounded-lg'
                //onClic={() =>}
                >
                    Eliminar
                </button>
            </div>

        </div>
    )
}

export default ViewProductos
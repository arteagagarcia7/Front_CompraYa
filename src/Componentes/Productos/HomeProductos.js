import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import crud from '../../conexiones/crud';
//import crud from '../../conexiones/crud';
import Header from '../Header';
import Sidebar from '../Sidebar';
import ViewProductos from './ViewProductos';
//import swal from 'sweetalert';

const HomeProductos = () => {

    const { idCategoria } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            //console.log(token);

            if (!token) {
                navigate("/login");
            }
        }

        autenticarUsuario()
    }, [navigate]); //El useEffect solo se va a ejecutaruna vez,  al inicio. Cuando los parentesis cuadrados([]) estan vacios o con el navigate.

    const [productos, setProductos] = useState([]);

    const cargarProductos = async () => {
        const response = await crud.GET (`/api/producto/${idCategoria}`);
        //console.log(response);
        setProductos(response);
    }
    //console.log(productos);
    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <>
            <Header />
            <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className='flex-1'>
                    <div className='mt-10 flex justify-center'>
                    <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                        Listado de Productos
                    </h1>
                    </div>
                    <div className='p-12'>
                        <Link
                        to={`/crear-producto/${idCategoria}`}
                            className='bg-violet-600 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg'
                        >Crear Productos
                        </Link>
                    </div>
                    <div className='bg-gray-600 shadow mt-10 rounded-lg'>
                        {
                            productos.map (producto => 
                                <ViewProductos
                                    key = {producto._id}
                                    producto={producto}
                                />
                            )
                        }
                    </div>
                </main>
            </div>
        </>
    );
}

export default HomeProductos;
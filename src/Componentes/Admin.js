import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import Header from './Header';
import Sidebar from './Sidebar';
import swal from 'sweetalert';

const Admin = () => {

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

    const [categoria, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        const response = await crud.GET(`/api/categoria`);
        //console.log(response);
        setCategorias(response.categoria);
    }

    useEffect(() => {
        cargarCategorias();
    }, [])// [] Hacen que solo se ejecute una vez el useEffect

    const borrarCategoria = async (idCategoria) => {
        //console.log(idCategoria);
        //const response = await crud.DELETE(`/api/categoria/${idCategoria}`);
        //const mensaje = response.mensaje;
        swal({
            title: '¿Esta seguro de borrar la categoría?',
            text: "Una vez eliminada, no podra recuperarla.",
            icon: 'warning',
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = crud.DELETE(`/api/categoria/${idCategoria}`);

                    if (response) {
                        swal("Categoría borrada correctamente.", {
                            icon: "success",
                        });
                    }
                    cargarCategorias();

                } else {
                    swal("Acción cancelada.");
                }
            });
    }

    return (
        <>
            <Header />
            <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className='flex-1'>
                    <h1 className= "mt-10 flex justify-center text-6xl text-indigo-600">
                        Listado de Categorias
                    </h1>
                    <table className='table table-bordered'>
                        <thead className='bg-white'>
                            <tr>
                                <th style={{ width: '10%' }}>Imagen</th>
                                <th style={{ width: '75%' }}>Nombre</th>
                                <th style={{ width: '15%' }}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {
                                categoria.map(
                                    item =>
                                        <tr key={item._id}>
                                            <img src={item.imagen}></img>
                                            <td>{item.nombre}</td>
                                            <td>
                                                <Link
                                                    to={`/home-productos/${item._id}`} >
                                                    Crear producto</Link>&nbsp;&nbsp;
                                                <Link
                                                    to={`/actualizar-categoria/${item._id}`} > 
                                                    Editar</Link>&nbsp;&nbsp; 
                                                <button
                                                    onClick={() => borrarCategoria(item._id)}>
                                                    Eliminar</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </main>
            </div>
        </>
    );
}

export default Admin;
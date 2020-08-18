import React, { Fragment, useState, useEffect } from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";
function App() {
    const [busqueda, guardarBusqueda] = useState({
        ciudad:'',
        pais:''
    });
    const {ciudad, pais} = busqueda;
    const [consultar, guardarConsultar] = useState(false);
    const [clima, guardarClima] = useState({});
    const [error, guardarError] = useState(false);
    useEffect( () => {
        const consultarAPI = async () => {
            if(consultar){
                const appId='KEY';
                const url=`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appId}&units=metric&lang=es`;
                
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                guardarClima(resultado);
                guardarConsultar(false);
                
                if(resultado.cod === "404"){
                    guardarError(true);
                }
                else{
                    guardarError(false);
                }
            }
        }
        consultarAPI();
        // eslint-disable-next-line
    },[consultar]);
    let componente;
    if(error){
        componente =<Error 
                        mensaje="No hay resultados"
                    />
    }
    else{
        componente =<Clima
                        resultado={clima}
                    />
    }
    return (
        <Fragment>    
            <Header
                titulo='Clima React Header'
            />

            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <div className="col m6 s12">
                            <Formulario
                                busqueda={busqueda}
                                guardarBusqueda={guardarBusqueda}
                                guardarConsultar={guardarConsultar}
                            />

                            
                        </div>
                        <div className="col m6 s12">
                            {componente}
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );
}

export default App;

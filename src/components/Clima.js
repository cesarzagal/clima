import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({resultado}) => {
if(Object.keys(resultado).length===0){
    return null;
}
const { name, main, weather } = resultado;

let urlImg=`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return ( 
        <div className='card-panel white col s12'>
            <div className='black-text'>
                <h2>El Clima de {name} es:</h2>
                <p className='temperatura'>                    
                    <img alt="icono" src={urlImg} /> {main.temp} &deg;C                    
                </p>
                <p>
                    Max: {main.temp_max} &deg;C
                </p>
                <p>
                    Min: {main.temp_min} &deg;C
                </p>
            </div>

        </div>
    );
}
Clima.propTypes={
    resultado: PropTypes.object.isRequired
}

export default Clima;
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Error from './../utils/Error';

const Formulario = props => {

    const { setLoading, setImagen, setPaginaActual } = props;

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();

        setLoading(true);
        setPaginaActual(1);

        if (termino === '') {
            setError(true);
            setLoading(false);
            return;
        }

        setError(false);
        setImagen(termino);
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                error ?
                    <Error message="Se necesita una referencia para buscar imagenes" />
                :
                    null
            }
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o cafe"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <button 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
}

Formulario.propTypes = {
    setLoading: PropTypes.func.isRequired,
    setImagen: PropTypes.func.isRequired,
    setPaginaActual: PropTypes.func.isRequired
}
 
export default Formulario;
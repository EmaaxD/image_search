import React, { useState, useEffect } from 'react';

import Formulario from './components/Formulario';
import Spinner from './components/utils/Spinner';
import Error from './components/utils/Error';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [imagen, setImagen] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState(false);
  const [paginaactual, setPaginaActual] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if(imagen === '') return;

      const imagenesPorPaginas = 30;
      const key = '16854166-cc6c0d56044befad8d1a32c12';
      const url = `https://pixabay.com/api/?key=${key}&q=${imagen}&per_page=${imagenesPorPaginas}&page=${paginaactual}`;

      try {
        const respuesta = await fetch(url);
        const { totalHits, hits: data } = await respuesta.json();
        
        setLoading(false);
        setImagenes(data);

        const calcularTotalPaginas = Math.ceil(totalHits / imagenesPorPaginas);
        setTotalPaginas(calcularTotalPaginas);

      } catch (error) {
        setError(true);
      }
      
    }

    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth' });

    consultarApi();

  }, [imagen, paginaactual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual)
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    setPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>

        {
          error ?
            <Error message="Error Interno, por favor intentelo mas tarde" />
          :
            null
        }

        <Formulario 
          setLoading = {setLoading}
          setImagen ={setImagen}
          setPaginaActual = {setPaginaActual}
        />
      </div>

      <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
          {
            loading ?
              <Spinner />
            :
              null
          }
        </div>
        {
          !loading ?
            <ListadoImagenes imagenes={imagenes} />
          :
            null
        }
        <div className="col-md-12 d-flex justify-content-center">
          {
            paginaactual === 1 ?
              null
            :
              <button
                type="button"
                className="btn btn-info mr-1"
                onClick={paginaAnterior}
              >&laquo; Anterior </button>
          }
          
          {
            paginaactual === totalpaginas ?
              null
            :
              loading ? 
                null
              :
              imagenes.length > 0 ?
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={paginaSiguiente}
                >Siguiente &raquo; </button>
              :
                null  
          }
        </div>
      </div>
    </div>
  );
}

export default App;

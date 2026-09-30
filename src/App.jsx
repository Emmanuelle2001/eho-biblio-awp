import { useState, useEffect } from 'react'
import './App.css'

const formatearTitulo = (titulo) => {
  return titulo.charAt(0).toUpperCase() + titulo.slice(1);
};

const filtrarFotos = (fotos, cantidad) => {
  return fotos.slice(0, cantidad);
};

function Encabezado({ titulo, subtitulo, color }) {
  return (
    <header className="text-center py-4 mb-4" style={{ backgroundColor: color }}>
      <h1 className="text-white fw-bold">{titulo}</h1>
      <p className="text-white-50 lead mb-0">{subtitulo}</p>
    </header>
  );
}


function TarjetaFoto(props) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={props.url}
          className="card-img-top"
          alt={props.titulo}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <p className="card-text text-muted small">{formatearTitulo(props.titulo)}</p>
          <span className="badge bg-primary">Foto #{props.id}</span>
        </div>
      </div>
    </div>
  );
}

function ContadorFotos({ cantidad }) {
  return (
    <div className="alert alert-primary text-center mb-4">
      <strong>{cantidad}</strong> FOTOS DE VARIAS COSAS
    </div>
  );
}


export default function App() {
  const [fotos, setFotos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerFotos = () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/photos');
        const datos = await respuesta.json();
        resolve(datos);
      }, 3000);
    });
  };

  useEffect(() => {
    const cargarFotos = async () => {
      const datos = await obtenerFotos();
      const fotosFiltradas = filtrarFotos(datos, 12);
      setFotos(fotosFiltradas);
      setCargando(false);
    };
    cargarFotos();
  }, []);

  return (
    <div>
      <Encabezado
        titulo="Biblioteca De Fotos"
        subtitulo="Galería de Fotografías"
        color="#472BC4"
      />

      <div className="container">
        {cargando ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p className="text-muted">Cargando galería, por favor espera...</p>
          </div>
        ) : (
          <>
            <ContadorFotos cantidad={fotos.length} />
            <div className="row">
              {fotos.map((foto) => (
                <TarjetaFoto
                  key={foto.id}
                  id={foto.id}
                  titulo={foto.title}
                  url={foto.url}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

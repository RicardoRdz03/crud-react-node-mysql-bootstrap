import './App.css';
import{useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [años,setAños] = useState(0);

  const[empleadosLista,setEmpleados] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      años:años
    }).then(()=>{
      getEmpleados();
      alert("Empleado registrado");
    });
  }

  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }

  getEmpleados();

  return (
    <div className='container'>
      <div className="card text-bg-light mb-3">
        <div className="card-header"><h5 className="card-title text-center">GESTIÓN DE EMPLEADOS</h5></div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">Nombre</span>
            <input id="espaciado" onChange={(event)=>{setNombre(event.target.value);}} type="text" className="form-control" placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">Edad</span>
            <input onChange={(event)=>{setEdad(event.target.value);}} type="number" className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">País</span>
            <input onChange={(event)=>{setPais(event.target.value);}} type="text" className="form-control" placeholder="Ingrese el país" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">Cargo</span>
            <input onChange={(event)=>{setCargo(event.target.value);}} type="text" className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">Años de experiencia</span>
            <input onChange={(event)=>{setAños(event.target.value);}} type="number" className="form-control" placeholder="Ingrese los años" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-success" type='submit' onClick={add}>Registrar</button>
        </div>
      </div>
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">País</th>
          <th scope="col">Cargo</th>
          <th scope="col">Experiencia</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

        {
          empleadosLista.map((val,key)=>{
            return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.años}</td>
                    </tr>
          })
        }

      </tbody>
      </table>
    </div>
  );
}

export default App;

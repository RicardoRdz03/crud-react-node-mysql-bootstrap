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

  return (
    <div className='container'>
    <div className="App">
      <div className='lista'>
        <button class="btn btn-primary" onClick={getEmpleados}>Listar</button>
        {
          empleadosLista.map((val,key)=>{
            return <div className=''>{val.nombre}</div>
          })
        }
      </div>

      <div class="card text-bg-dark mb-3">
        <div class="card-header"><h5 class="card-title text-center">GESTIÓN DE EMPLEADOS</h5></div>
        <div class="card-body">
          
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Nombre</span>
            <input onChange={(event)=>{setNombre(event.target.value);}} type="text" class="form-control" placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="addon-wrapping"/>
          </div>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Edad</span>
            <input onChange={(event)=>{setEdad(event.target.value);}} type="number" class="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="addon-wrapping"/>
          </div>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">País</span>
            <input onChange={(event)=>{setPais(event.target.value);}} type="text" class="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="addon-wrapping"/>
          </div>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Cargo</span>
            <input onChange={(event)=>{setCargo(event.target.value);}} type="text" class="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="addon-wrapping"/>
          </div>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Años</span>
            <input onChange={(event)=>{setAños(event.target.value);}} type="number" class="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="addon-wrapping"/>
          </div>
        </div>
        <div class="card-footer text-center">
          <button class="btn btn-success" type='submit' onClick={add}>Registrar</button>
        </div>
      </div>

    </div>
    </div>
  );
}

export default App;

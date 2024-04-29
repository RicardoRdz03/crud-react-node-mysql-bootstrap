import './App.css';
import{useState} from "react";
import Axios from "axios";

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
    <div className="App">
      <div className='lista'>
        {
          empleadosLista.map((val,key)=>{
            return <div className=''>{val.nombre}</div>
          })
        }
      </div>
      <div class="card text-white bg-primary mb-3">
  <div class="card-header"><h4 class="card-title text-center">Gestión de empleados</h4></div>
  <div id='carta-cuerpo' class="card-body text-center">
        <label>Nombre: <input onChange={(event)=>{setNombre(event.target.value);}} type="text"/></label>
        <label>Edad: <input onChange={(event)=>{setEdad(event.target.value);}} type="number"/></label>
        <label>País: <input onChange={(event)=>{setPais(event.target.value);}} type="text"/></label>
        <label>Cargo: <input onChange={(event)=>{setCargo(event.target.value);}} type="text"/></label>
        <label>Años: <input onChange={(event)=>{setAños(event.target.value);}} type="number"/></label>
  </div>
  <div class="card-footer text-white text-center">
      <button className='btn btn-dark' onClick={add}>Registrar</button>
  </div>
</div>
    </div>
    </div>
  );
}

export default App;

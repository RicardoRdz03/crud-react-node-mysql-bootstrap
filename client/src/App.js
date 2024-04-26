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
      alert("Empleado registrado");
    });
  }

  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
      alert("hola");
    });
  }

  return (
    <div className="App">
      <div className="datos">
        <label>Nombre: <input onChange={(event)=>{setNombre(event.target.value);}} type="text"/></label>
        <label>Edad: <input onChange={(event)=>{setEdad(event.target.value);}} type="number"/></label>
        <label>País: <input onChange={(event)=>{setPais(event.target.value);}} type="text"/></label>
        <label>Cargo: <input onChange={(event)=>{setCargo(event.target.value);}} type="text"/></label>
        <label>Años: <input onChange={(event)=>{setAños(event.target.value);}} type="number"/></label>
        <button onClick={add}>Registrar</button>
      </div>
      <div className='lista'>
        <button onClick={getEmpleados}>Listar</button>
        {
          empleadosLista.map((val,key)=>{
            return <div className=''>{val.nombre}</div>
          })
        }
      </div>
    </div>
  );
}

export default App;

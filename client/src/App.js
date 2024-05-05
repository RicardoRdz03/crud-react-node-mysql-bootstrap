import './App.css';
import{useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState();
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [años,setAños] = useState();
  const [id,setId] = useState();

  const [editar,setEditar] = useState(false);

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
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Registro exitoso!</strong>",
        html: "<i>El empleado <strong>" +nombre+ "</strong> fue registrado con éxito </i>",
        icon: 'success',
        timer: 3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró registrar el empleado',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const limpiarCampos=()=>{
    setNombre("");
    setId("");
    setPais("");
    setEdad("");
    setAños("");
    setCargo("");
    setEditar(false);
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      años:años
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Actualización exitosa!</strong>",
        html: "<i>El empleado <strong>" +nombre+ "</strong> fue actualizado con éxito </i>",
        icon: 'success',
        timer: 3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró actualizar los datos el empleado',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const borrarDatos = (val)=>{

    Swal.fire({
      title: "Confirmar eliminación",
      html: "<i>¿Realmente desea eliminar a <strong>" +val.nombre+ "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`,).then(()=>{
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            icon:'success',
            title: val.nombre+ ' fue eliminado.',
            showConfirmButton: false,
            timer: 2000
        });
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el empleado',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });

    
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAños(val.años);
    setId(val.id);
  }

  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }

  getEmpleados();

  return (
    <div className='container'>
      <div className="card text-bg-light mb-3 mt-3">
        <div className="card-header"><h5 className="card-title text-center">GESTIÓN DE EMPLEADOS</h5></div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">Nombre</span>
            <input value={nombre} id="espaciado" onChange={(event)=>{setNombre(event.target.value);}} type="text" className="form-control" placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">Edad</span>
            <input value={edad} onChange={(event)=>{setEdad(event.target.value);}} type="number" className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">País</span>
            <input value={pais} onChange={(event)=>{setPais(event.target.value);}} type="text" className="form-control" placeholder="Ingrese el país" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">Cargo</span>
            <input value={cargo} onChange={(event)=>{setCargo(event.target.value);}} type="text" className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="addon-wrapping">Años de experiencia</span>
            <input value={años} onChange={(event)=>{setAños(event.target.value);}} type="number" className="form-control" placeholder="Ingrese los años" aria-label="Username" aria-describedby="addon-wrapping" required/>
          </div>
        </div>
        <div className="card-footer text-center">
          {
            editar?
            <div>
            <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
            <button className="btn btn-danger m-2" onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className="btn btn-success" onClick={add}>Registrar</button>
          }
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
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button onClick={()=>{editarEmpleado(val)}} type="button" className="btn btn-info">Editar</button>
                          <button type="button" onClick={()=>{borrarDatos(val);}} className="btn btn-danger">Eliminar</button>
                        </div>
                      </td>
                    </tr>
          })
        }

      </tbody>
      </table>
    </div>
  );
}

export default App;

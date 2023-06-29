
Actualizar();

function Consultar(x) {

    fetch('http://127.0.0.1:3000/consultar/' + x).then((response) => response.json()).then((data) => {
        document.getElementById("idED").value = data[0].id_empleados;
        document.getElementById("nombreED").value = data[0].nombre_empleados;
        document.getElementById("fechaED").value = data[0].fecha_empleados;
        document.getElementById("entradaED").value = data[0].entrada_empleados;
        document.getElementById("salidaED").value = data[0].salida_empleados;
        

    });


}

function Crear() {


    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const entrada = document.getElementById("entrada").value;
    const salida = document.getElementById("salida").value;

    fetch('http://127.0.0.1:3000/insertar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombre, fecha: fecha, entrada: entrada, salida: salida }),
    }).then((response) => response.json()).then((data) => {
        message = data.message;
        Actualizar();
        $('body').on('show.bs.modal', '.modal', function () {
            $('.modal:visible').removeClass('fade').modal('hide').addClass('fade');
        });
    });





}
function Actualizar() {

    fetch('http://127.0.0.1:3000/').then((response) =>
        response.json()).then((datos) => {

            let placeholder = document.querySelector("#data-output");
            let out = "";
            for (let dato of datos) {
                out += `
              <tr>
                 <td>${dato.id_empleados}</td>
                 <td> ${dato.nombre_empleados}</td>
                 <td>${dato.fecha_empleados}</td>
                 <td>${dato.entrada_empleados}</td>
                 <td>${dato.salida_empleados}</td>
                 <td><input type="submit" onclick="Consultar(${dato.id_empleados})" value="Editar" /></td>
                 <td><input type="submit" onclick="Borrar(${dato.id_empleados})"value="Borrar" /></td>
                 
                 
              </tr>
           `;
            }

            placeholder.innerHTML = out;



        })

}

function Borrar(y) {
    //borrar 

    fetch('http://127.0.0.1:3000/borrar/' + y, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombre, fecha: fecha, entrada: entrada, salida: salida }),
    }).then((response) => response.json()).then((data) => {
        message = data.message;
        alert("Se Borro Correctamente");


    });

}

function Cargar() {
    var input = document.querySelector('input[type="file"]')

    var data = new FormData()
    data.append('file', input.files[0])

    fetch('http://127.0.0.1:3000/read', {
        method: 'POST',
        body: data
    })

}

function Editar() {
    const id = document.getElementById("idED").value;
    const nombre = document.getElementById("nombreED").value;
    const fecha = document.getElementById("fechaED").value;
    const entrada = document.getElementById("entradaED").value;
    const salida = document.getElementById("salidaED").value;

    fetch('http://127.0.0.1:3000/actualizar/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },

        body: JSON.stringify({ nombre: nombre, fecha: fecha, entrada: entrada, salida: salida }),
    }).then((response) => response.json()).then((data) => {
        message = data.message;
        alert("Se Edito Correctamente");
    });
    
}



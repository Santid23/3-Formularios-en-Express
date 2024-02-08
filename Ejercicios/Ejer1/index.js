const express = require(`express`)
const app = express()
let array = require('./datos')

app.use(express.static('public'))

app.get(`/animales`, function (request, response) {
    response.send(animalPrint("Los animales", array))
})

app.get('/sumar-animal', function(req, res) {
    let {name, age, animal} = req.query
    age = parseInt(age)

    array.push({name, age, animal})

    res.send({mensaje: '${name} añadido', results: array})
})

app.get('/adoptar', function(req, res) {
    array = array.filter((animal) => animal.name != req.query.name)
    res.send(animalPrint('Se ha adoptado', array))
})

function animalPrint(msg, array){
    let salida = ""
    for (let i = 0; i <array.length; i++) {
        salida += ` 
        <tr>
            <td>${array[i].name}</td>
            <td>${array[i].age}</td>
            <td>${array[i].animal}</td>
            <td> 
               <form action="/adoptar">
                <input type="text" hidden name="nombre" value="${array[i].name}" id="nombre">
                <button type="submit">Enviar</button>
                </form>
            </td>
        </tr>`    
    }

    return `
            <h3>${msg}</h3>
            <table>
            <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Tipo Animal</th>
            </tr>
            ${salida}
        </table>`
}


app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error('No se ha podido iniciar el servidor')
        : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))
})
import UserManager from './managers/UserManager.js';
const express = require('express');
const manager = new UserManager('./files/Usuarios.json');

// const env = async () => {
//     const usuarios = await manager.getUsers();
//     console.log(usuarios);

//     const user = {
//         nombre: 'agustin',
//         apellido: 'Mariani',
//         edad: 28,
//         curso: 'Backend'
//     };

//     await manager.createUser(user);

//     const usersResult = await manager.getUsers();
//     console.log(usersResult);
// }

// env();



const app = express();

app.get('/usuarios', (req, res) => {
    const limit = req.query.limit; // Obtener el valor del parámetro de consulta "limit"

    let usuarios;
    if (limit) {
        // Si se proporciona el parámetro "limit", devolver el número de usuarios solicitados
        const parsedLimit = parseInt(limit);
        usuarios = manager.getusuarios().slice(0, parsedLimit);
    } else {
        // Si no se proporciona el parámetro "limit", devolver todos los usuarios
        usuarios = manager.getusuarios();
    }

    res.json({ usuarios });
});

app.get('/usuarios/:pid', (req, res) => {
    const usuarioId = req.params.pid; // Obtener el valor del parámetro de ruta "pid"

    const usuario = manager.getusuarioById(usuarioId);
    if (!usuario) {
        // Si no se encuentra el Usuario, devolver un error 404
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ usuario });
});

app.listen(8080, () => {
    console.log('Servidor en funcionamiento en el puerto 8080');
});
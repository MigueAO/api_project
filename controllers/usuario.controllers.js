const { response, json } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario.model");

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google')

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async(req, res) => {

    //console.log(req.body);
    const { nombre, email, password } = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya ha sido registrado'
            })
        }
        // Creamos un objeto de la clase model Usuario
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Indicamos a mongoose que registre al usuario en la BD
        await usuario.save();
        
        // Mostramos los usuarios
        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500) - json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        })
    }

}

const actualizarUsuario = async(req, res= response)=>{
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuarios con ese id'
            });
        }

        //Codigo previo a la actualización
        const{password, google, email, ...campos} = req.body;
        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                });
            }
        }
        campos.email = email;

        //actualización de datos
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500),json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const eliminarUsuario = async(req, res=response) =>{
    const uid = req.params.id;
    try{
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuarios con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        
        res.json({
            ok:true,
            msg: 'Usuario eliminado de la db}'
        });
    } catch (error) {
        console.log(error);
        res.status(500),json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
}
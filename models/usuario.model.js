const { Schema, model, SchemaTypes } = require('mongoose');

//Defginicion del esquema para la coleccion de Ususairo

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

//Configuracion opcional para cambiar el _id por uid
//Este cambio es solo para fines visuales, la bd permanece con _id

UsuarioSchema.method('toJSON', function() {
    const { __V, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})


// se exporta el modelo
// Por defecto moongose creara un mongodb un documento en plurarl: Usuarios
module.exports = model('Usuario', UsuarioSchema);
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

async function register (req, res) {
    const { 
        firstname,
        lastname,
        email,
        password,
        dateOfBirth
     } = req.body;

     const birthDate = new Date(dateOfBirth);
     const currentDate = new Date();
     const age = currentDate.getFullYear() - birthDate.getFullYear();
     const monthDifference = currentDate.getMonth() - birthDate.getMonth();
     const dayDifference = currentDate.getDate() - birthDate.getDate();
 
     if (
         age < 18 || 
         (age === 18 && monthDifference < 0) || 
         (age === 18 && monthDifference === 0 && dayDifference < 0)
     ) {
         return res.status(400).send({ msg: "Debes tener al menos 18 años para registrarte" });
     }

     if(!email) return res.status(400).send({msg: "El email es obligatorio"});
     if(!password) return res.status(400).send({msg: "La contraseña es obligatoria"});
     if(!dateOfBirth) return res.status(400).send({msg: "La fecha de nacimiento es obligatoria"});

     try {
        const user = new User({
            firstname,
            lastname,
            email: email.toLowerCase(),
            dateOfBirth,
            role: "user",
            active: true,
        })

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;

        const savedUser = await user.save();

        res.status(200).send(savedUser);
        
     } catch (error) {
        return res.status(500).send(error);
     }
}

async function login(req, res) {
    const {
        email,
        password
    } = req.body;

    if(!email) return res.status(400).send({ msg: "El email es obligatorio"});
    if(!password) return res.status(400).send({ msg: "La contraseña es obligatoria"});

    try {

        const user = await User.findOne({email: email.toLowerCase()})
        if (!user) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }


        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(400).send({ msg: "Contraseña incorrecta" });
        }

        const active = user.active;
        if(!active){
            return res.status(401).send({ msg: "Usuario no autorizado o no activo"})
        }

        res.status(200).send({
            access: jwt.createAccessToken(user),
            refresh: jwt.createRefreshToken(user),
        });
         
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function refreshAccessToken (req, res) {
    const { token } = req.body;

    if(!token) return res.status(400).send({ msg: "Token requerido"})

    const { user_id } = jwt.decoded(token);

    try {
        const user = await User.findOne({_id: user_id});
        if(!user){
            return res.status(500).send({ msg: "Error del servidor"});
        }

        res.status(200).send({
            accessToken: jwt.createAccessToken(user),
        })

    } catch (error) {
        return res.status(500).send({ msg: "Error en el servidor" });
    }
}

module.exports = {
    register,
    login,
    refreshAccessToken
}
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import * as jwt from '../utils/jwt.js';

export async function getMe(req, res) {
    const { user_id } = req.user;

    const response = await User.findById(user_id);

    if (!response) {
        return res.status(400).send({ msg: "No se ha encontrado usuario" });
    } else {
        res.status(200).send(response);
    }
}

export async function updateUser(req, res) {
    const { user_id } = req.user;
    const userData = req.body;
    
    try {
        if (userData.password) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(userData.password, salt);
            userData.password = hashPassword;
        } else {
            delete userData.password;
        }

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            userData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }

        res.status(200).send({ msg: "Actualización correcta", user: updatedUser });
    } catch (error) {
        res.status(500).send({ msg: "Error al actualizar el usuario" });
    }
}

export async function deleteUser(req, res) {
    const { user_id } = req.user;

    try {
        const deletedUser = await User.findByIdAndDelete(user_id);
        if (!deletedUser) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }

        res.status(200).send({ msg: "Se eliminó al usuario" });
    } catch (error) {
        res.status(500).send({ msg: "Error al eliminar el usuario" });
    }
}

const { model } = require('mongoose');
const Appoinment = require('../models/appoinment');

async function createAppoinment (req, res) {
    const { user_id } = req.user;
    const {
        date,
        description
    } = req.body
    
    try {
        const appoinment = new Appoinment({
            date,
            description,
            user: user_id,
            acceptedByAdmin: false,
            active: true
        });

        const savedAppoinment = await appoinment.save();
        return res.status(200).send({ msg: "Cita agendada con éxito", cita: savedAppoinment});

    } catch (error) {
        res.status(500).send({ msg: "Error al agendar la cita"});
    }
}

async function getAppoinment(req, res) {
    const { id } = req.params;

    try {
        const response = await Appoinment.findById(id);
        
        if(!response){
            return res.status(500).send({ msg: "No se ha encontradola cita"})
        }
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ msg: "Error al obetener la cita", error})
    }    
}


async function getAppoinments (req, res) {
    const {active} = req.query;

    let response = null;

    try {
        if (active === undefined){
            response = await Appoinment.find();
        } else {
            response = await Appoinment.find({ active });
        }

        if(response == ""){
            return res.status(400).send({ msg: "No se ha encontrado ninguna cita"});
        }
    
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({msg: "Error al mostrar las citas", error});
    }
}

async function updateAppoinment (req, res) {
    const { id } = req.params;

    const appoinmentData = req.body;

    try {
        const updatedAppoinment = await Appoinment.findByIdAndUpdate(
            id,
            appoinmentData,
            {new: true},
        )

        if(!updatedAppoinment){
            return res.status(404).send({ msg: "Error al actualizar la cita"});
        }

        res.status(200).send({ msg: "Atualización correcta", product: updatedAppoinment });

    } catch (error) {
        res.status(500).send({ msg: "Error al actualizar la cita"})
    }
    
}

async function deleteAppoinment (req, res) {
    const { id } = req.params;

    try {
        const deletedAppoinment = await Appoinment.findByIdAndDelete(id);

        if(!deletedAppoinment){
            return res.status(404).send({ msg: "Error al eliminar la cita"});
        }

        res.status(200).send({ msg: "Cita eliminada correctamente"});
    } catch (error) {
        res.status(500).send({ msg: "Error al eliminar la cita", error})
    }
}

module.exports = {
    createAppoinment,
    getAppoinment,
    getAppoinments,
    updateAppoinment,
    deleteAppoinment
}
import Checkout from '../models/checkout.js';

// Agregar o actualizar los datos del cliente y dirección
export const addClientData = async (req, res) => {
    const {
        userId,
        firstname,
        lastname,
        email,
        identification,
        phoneNumber,
        department,
        municipality,
        street,
        aditionalDescription,
        neighborhood,
        delivery,
        deliveryCost
    } = req.body;

    try {
        let checkout = await Checkout.findOne({ userId });

        // Si no existe, crea uno nuevo
        if (!checkout) {
            checkout = new Checkout({
                userId,
                clientData: [{}],  // Inicializa con un objeto vacío
                clientDirection: [{}],
                delivery: true,
                deliveryCost: deliveryCost || 0
            });
        }

        // Actualizar solo los datos del cliente que se reciben en el request
        const clientData = checkout.clientData[0] || {};  // Asegúrate de que sea un objeto
        if (firstname) clientData.firstname = firstname;
        if (lastname) clientData.lastname = lastname;
        if (email) clientData.email = email;
        if (identification) clientData.identification = identification;
        if (phoneNumber) clientData.phoneNumber = phoneNumber;

        // Actualizar solo los datos de la dirección que se reciben en el request
        const clientDirection = checkout.clientDirection[0] || {};  // Asegúrate de que sea un objeto
        if (department) clientDirection.department = department;
        if (municipality) clientDirection.municipality = municipality;
        if (street) clientDirection.street = street;
        if (aditionalDescription) clientDirection.aditionalDescription = aditionalDescription;
        if (neighborhood) clientDirection.neighborhood = neighborhood;

        if (delivery !== undefined) {
            checkout.delivery = delivery;
        }

        if (deliveryCost !== undefined) {
            checkout.deliveryCost = deliveryCost;
        }

        // Guarda los datos actualizados
        checkout.clientData = [clientData];
        checkout.clientDirection = [clientDirection];

        await checkout.save();
        return res.status(200).json(checkout);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar los datos del cliente y dirección
export const removeClientData = async (req, res) => {
    const { userId } = req.body;
    try {
        let checkout = await Checkout.findOne({ userId });

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        // Eliminar datos del cliente y dirección
        checkout.clientData = [];
        checkout.clientDirection = [];
        checkout.delivery = false;  
        checkout.deliveryCost = 0;


        await checkout.save();
        return res.status(200).json(checkout);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Obtener los datos del cliente y dirección
export const getClientData = async (req, res) => {
    const { userId } = req.params;
    try {
        const checkout = await Checkout.findOne({ userId });
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        const clientData = checkout.clientData;
        const clientDirection = checkout.clientDirection;
        const delivery = checkout.delivery;
        const deliveryCost = checkout.deliveryCost;

        return res.status(200).json({ clientData, clientDirection, delivery, deliveryCost });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

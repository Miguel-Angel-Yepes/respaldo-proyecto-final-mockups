// const mercadopago = require('mercadopago');

// // Configuración de MercadoPago
// mercadopago.configure({
//     access_token: 'YOUR_ACCESS_TOKEN'
// });

// exports.createPreference = async (req, res) => {
//     try {
//         // En lugar de crear un solo item, toma todo el array de items que viene en req.body
//         const items = req.body.items.map(item => ({
//             title: item.title,
//             quantity: Number(item.quantity),
//             unit_price: Number(item.unit_price),
//             currency_id: "COP", // Puedes cambiarlo según sea necesario
//         }));

//         // Cuerpo de la preferencia
//         const body = {
//             items: items,  // Aquí va todo el array de productos
//             back_urls: {
//                 success: "https://www.youtube.com/watch?v=7oXfKZDZ_0c",
//                 failure: "https://www.youtube.com/watch?v=D3enxLZosHg",
//                 pending: "https://www.youtube.com/watch?v=Igu4hGD0Mgw",
//             },
//             auto_return: "approved",
//         };

//         // Crear la preferencia usando mercadopago.preferences.create
//         const result = await mercadopago.preferences.create(body);

//         // Responder con el ID de la preferencia
//         res.json({
//             id: result.body.id,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: "Error al crear la preferencia :(",
//         });
//     }
// };

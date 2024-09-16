import * as Yup from 'yup';

export function initialValues(product) {
    return{
        name: product?.name || "",
        category: product?.category || "",
        images: product?.images|| "",
        file: null,
        info: product?.info || "",
        price: product?.price || undefined,
        stock: product?.stock || undefined,
        discount: product?.discount || undefined,
        cantDiscount: product?.cantDiscount || 0,
    };
}

export function validationSchema() {
    return Yup.object({
        name: Yup.string().required(true),
        category: Yup.string().required(true),
        info: Yup.string().required(true),
        price: Yup.number().required(true).min(1, "El precio debe ser mayor a 0"),
        stock: Yup.number().required(true),
        discount: Yup.boolean().required(true),
        cantDiscount: Yup.number().max(99,"Debe ser menor a 100")
    });
}
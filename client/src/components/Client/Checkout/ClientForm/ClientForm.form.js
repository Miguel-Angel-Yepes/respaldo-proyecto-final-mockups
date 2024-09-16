import * as Yup from 'yup';

export function initialValues(clientData) {
    
    return {
      firstname: clientData?.firstname || "",
      lastname: clientData?.lastname || "",
      email: clientData?.email || "",
      identification: clientData?.identification|| "",
      phoneNumber: clientData?.phoneNumber || "",
    };
}


export function validationSchema() {
    return Yup.object({
      firstname: Yup.string().required(true),
      lastname: Yup.string().required(true),
      email: Yup.string()
        .email("El email no es válido")
        .required(true),

      identification: Yup.string()
        .matches(/^[0-9]{10}$/, "La cédula debe tener exactamente 10 dígitos")
        .required(true),

      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "El número de teléfono debe tener exactamente 10 dígitos")
        .required(true),
    });
  }
  
import * as Yup from 'yup';

export function initialValues() {
  return {
    firstname: "",
    lastname: "",
    email: "",
    dateOfBirth: "",
    password: "",
    repeatPassword: "",
    conditionsAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
    dateOfBirth: Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("Campo obligatorio"),

    password: Yup.string()
      .required("Campo obligatorio"),

    repeatPassword: Yup.string()
      .required("Campo obligatorio")
      .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),

    conditionsAccepted: Yup.bool()
      .oneOf([true], "Debes aceptar las políticas de privacidad"),
  });
}

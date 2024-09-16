import * as Yup from 'yup';

export function initialValues() {
  return {
    animal: '',
    appoinmentType: '',
    size: '',
    date: '',
    time: '',
    description: '',
    petName: '', 
    active: true
  };
}

export function validationSchema() {
  return Yup.object({
    animal: Yup.string().required('El tipo de animal es obligatorio'),
    appoinmentType: Yup.string().required('El tipo de cita es obligatorio'),
    size: Yup.string().required('El tamaño del animal es obligatorio'),
    date: Yup.string().required('La fecha es obligatoria'),
    time: Yup.string().required('La hora es obligatoria'),
    description: Yup.string(),
    petName: Yup.string().required('El nombre del animal es obligatorio'),
  });
}
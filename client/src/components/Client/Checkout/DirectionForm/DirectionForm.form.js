import * as Yup from 'yup';

export function initialValues(directionData) {

    return {
      department: directionData?.department || "",
      municipality: directionData?.municipality || "",
      street: directionData?. street || "",
      aditionalDescription: directionData?.aditionalDescription|| "",
      neighborhood: directionData?.neighborhood || "",
    };
}


export function validationSchema() {
    return Yup.object({
      department: Yup.string().required(true),
      municipality: Yup.string().required(true),
      street: Yup.string().required(true),
      aditionalDescription: Yup.string(),
      neighborhood: Yup.string().required(true),
    });
  }
  
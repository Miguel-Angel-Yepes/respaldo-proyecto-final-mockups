import React, {useState} from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './RegisterForm.form';
import { Auth } from '../../../../api';
import { image } from '../../../../assets';
import '../Form.css';

const authController = new Auth();

export function RegisterForm(props) {

    const { openLogin } = props;

    const [error, setError] = useState("");

    
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValue ) => {
        try {
          setError("");
          await authController.register(formValue);
          openLogin();
        } catch (error) {
          // console.log(error)
          setError(error.msg);
        }
      }
    })

  return (
    <Form className="form register" onSubmit={formik.handleSubmit}> 
      <Image src={image.LogoServimascotascolor} className='logo'/>

      <Form.Group widths="equal">
        <Form.Input 
            name="firstname" 
            placeholder="Nombre" 
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.errors.firstname}
        />

        <Form.Input 
            name="lastname" 
            placeholder="Apellido" 
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
        />
      </Form.Group>

      <Form.Group widths="equal">      
        <Form.Input 
          name="email" 
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <Form.Input
          name="dateOfBirth"
          type="date"
          placeholder="Fecha de nacimiento"
          onChange={formik.handleChange}
          value={formik.values.dateOfBirth}
          error={formik.errors.dateOfBirth}
        />
      </Form.Group>


      <Form.Input 
        name="password" 
        type="password" 
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Form.Input 
        name="repeatPassword" 
        type="password" 
        placeholder="Repetir contraseña"
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />

      <Form.Checkbox 
        name="conditionsAccepted" 
        label="He leído y acepto las políticas de privacidad" 
        onChange={(_, data) => 
          formik.setFieldValue("conditionsAccepted", data.checked)
        }
        checked={formik.values.conditionsAccepted}
        error={formik.errors.conditionsAccepted}
      />

      <Form.Button 
        type='submit' 
        fluid loading={formik.isSubmitting}  
        style={{ backgroundColor: '#0ba69e', color: 'white' }}
      >
        Crear cuenta
      </Form.Button>

      <p className='register-form__error'> {error} </p>

      <p> ¿Ya tienes una cuenta? 
            <button onClick={openLogin} className="auth__toggle">
              Inicia sesión
            </button>
      </p>
       
    </Form>

  )
}

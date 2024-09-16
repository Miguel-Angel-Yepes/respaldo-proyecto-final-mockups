import React, {useState, useEffect} from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ClientForm.form';
import { Checkout } from '../../../../api';
import { useAuth } from '../../../../hooks';
import styles from './ClientForm.module.css';

const checkoutController = new Checkout();

export function ClientForm(props) {

  const {user} = useAuth();

  const { clientData, toggleClient } = props;

  useEffect(() => {
    formik.setValues(initialValues(clientData));
  }, [clientData]);
  
  const formik = useFormik({
    initialValues: initialValues(clientData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await checkoutController.addClientData(formValue, user._id);
        toggleClient();
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <Form className={styles.clientForm} onSubmit={formik.handleSubmit}> 
      <div className={styles.clientFormP} >
        <div>
          <p>1</p>
        </div>
        <p>Datos personales</p>
      </div>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Nombre</label>
          <Form.Input
            name="firstname"
            placeholder="Nombre"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.errors.firstname}
          />
        </Form.Field>

        <Form.Field>
          <label>Apellido</label>
          <Form.Input
            name="lastname"
            placeholder="Apellido"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Field>
      </Form.Group>

      <Form.Field>
        <label>Correo electrónico</label>
        <Form.Input
          name="email"
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
      </Form.Field>

      <Form.Field>
        <label>Cédula de ciudadanía</label>
        <Form.Input
          name="identification"
          placeholder="Cédula de ciudadanía"
          onChange={formik.handleChange}
          value={formik.values.identification}
          error={formik.errors.identification}
        />
      </Form.Field>

      <Form.Field>
        <label>Teléfono celular</label>
        <Form.Input
          name="phoneNumber"
          placeholder="Teléfono celular"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
          error={formik.errors.phoneNumber}
        />
      </Form.Field>

      <Form.Button 
            type='submit' 
            fluid loading={formik.isSubmitting}  
            style={{ backgroundColor: '#0ba69e', color: 'white' }}
        >
          Ir al método de entrega
        </Form.Button>
    </Form>
  )
}

import React, { useState } from 'react';
import { Form, TextArea, Input, Modal, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AppoinmentsForm.form';
import styles from './Appoinments.module.css';
import { animalOptions, appoinmentTypeOptions, dogSizeOptions, catSizeOptions, timeOptions } from '../../../../utils/Constants/dropdownOptions';
import { Appoinment } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const appoinmentController = new Appoinment();

export function Appoinments() {
  const [sizeOptions, setSizeOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false); // Estado para controlar la redirección
  const { accessToken } = useAuth();
  const navigate = useNavigate(); // Define useNavigate

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnSubmit: true,
    onSubmit: async (formValue, { resetForm }) => {
      // Formatear la fecha y hora en un solo campo
      const dateTime = new Date(`${formValue.date}T${formValue.time}:00`);
      formValue.date = dateTime;

      try {
        // Crear la cita y enviar el correo
        await appoinmentController.createAppoinment(formValue, accessToken);
        setModalContent('Cita creada exitosamente. Será aceptada o denegada por el administrador.');
        setModalOpen(true);
        setShouldRedirect(true); // Activar redirección después de crear la cita
        resetForm();
      } catch (error) {
        // Mostrar el mensaje de error específico en el modal
        setModalContent(`Error al crear la cita: ${error.message}`);
        setModalOpen(true);
        setShouldRedirect(false); // No redirigir si hay un error
      }
    },
  });

  const handleAnimalChange = (e, { value }) => {
    formik.setFieldValue('animal', value);
    if (value === 'perro') setSizeOptions(dogSizeOptions);
    else if (value === 'gato') setSizeOptions(catSizeOptions);
    else setSizeOptions([]);
  };

  const closeModal = () => {
    setModalOpen(false);
    if (shouldRedirect) {
      navigate('/'); // Redirige solo si se creó la cita exitosamente
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Agendar Cita</h2>
        <Form className={styles.formElement} onSubmit={formik.handleSubmit}>
          <Form.Dropdown
            label="Tipo de animal"
            name="animal"
            placeholder="Selecciona tipo de animal"
            fluid
            selection
            options={animalOptions}
            value={formik.values.animal}
            onChange={handleAnimalChange}
            className={styles.formElement}
            error={formik.errors.animal ? { content: formik.errors.animal } : null}
          />
          <Form.Field
            control={Input}
            label="Nombre de la mascota"
            name="petName"
            placeholder="Introduce el nombre del animal"
            value={formik.values.petName}
            onChange={(_, data) => formik.setFieldValue('petName', data.value)}
            className={styles.formElement}
            error={formik.errors.petName ? { content: formik.errors.petName } : null}
          />
          <Form.Dropdown
            label="Tipo de cita"
            name="appoinmentType"
            placeholder="Selecciona tipo de cita"
            fluid
            selection
            options={appoinmentTypeOptions}
            value={formik.values.appoinmentType}
            onChange={(_, data) => formik.setFieldValue('appoinmentType', data.value)}
            className={styles.formElement}
            error={formik.errors.appoinmentType ? { content: formik.errors.appoinmentType } : null}
          />
          <Form.Dropdown
            label="Tamaño de la mascota"
            name="size"
            placeholder="Selecciona el tamaño"
            fluid
            selection
            options={sizeOptions}
            value={formik.values.size}
            onChange={(_, data) => formik.setFieldValue('size', data.value)}
            disabled={!formik.values.animal}
            className={styles.formElement}
            error={formik.errors.size ? { content: formik.errors.size } : null}
          />
          <Form.Field
            control={Input}
            type="date"
            label="Fecha"
            name="date"
            placeholder="Selecciona la fecha"
            value={formik.values.date}
            onChange={(_, data) => formik.setFieldValue('date', data.value)}
            className={styles.formElement}
            error={formik.errors.date ? { content: formik.errors.date } : null}
          />
          <Form.Dropdown
            label="Hora"
            name="time"
            placeholder="Selecciona la hora"
            fluid
            selection
            options={timeOptions}
            value={formik.values.time}
            onChange={(_, data) => formik.setFieldValue('time', data.value)}
            className={styles.formElement}
            error={formik.errors.time ? { content: formik.errors.time } : null}
          />
          <Form.Field
            control={TextArea}
            label="Datos adicionales (raza, comportamiento, etc.)"
            name="description"
            placeholder="Introduce información adicional sobre el animal"
            value={formik.values.description}
            onChange={(_, data) => formik.setFieldValue('description', data.value)}
            className={styles.formElement}
            error={formik.errors.description ? { content: formik.errors.description } : null}
          />
          <Form.Button
            type="submit"
            style={{ backgroundColor: '#009688', color: 'white' }}
            fluid
            loading={formik.isSubmitting}
            className={styles.submitButton}
          >
            Crear cita
          </Form.Button>
        </Form>
      </div>

      {/* Modal for success or error messages */}
      <Modal
        open={modalOpen}
        onClose={closeModal} // Usar la función que redirige condicionalmente
        size="small"
      >
        <Modal.Header>Información</Modal.Header>
        <Modal.Content>
          <p>{modalContent}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} color="green">
            Aceptar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

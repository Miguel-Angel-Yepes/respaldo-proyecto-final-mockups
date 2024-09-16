import React, { useState, useEffect } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './DirectionForm.form';
import { Checkout } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Cart, Preference } from '../../../../api';
import styles from './DirectionForm.module.css';

const cartController = new Cart();
const preferenceController = new Preference();
const checkoutController = new Checkout();

export function DirectionForm(props) {
  initMercadoPago('APP_USR-0b0888c5-7a07-4b08-a4f7-d75309c1435f', { locale: 'es-CO' });

  const { user } = useAuth();
  const { directionData } = props;
  const [cartContent, setCartContent] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [municipalityDisabled, setMunicipalityDisabled] = useState(true);

  useEffect(() => {
    formik.setValues(initialValues(directionData));

    // Si hay un departamento en directionData, cargar sus municipios
    if (directionData?.department) {
      const selectedDepartment = directionData.department;
      const selectedDepartmentOption = departmentOptions.find(opt => opt.value === selectedDepartment);
      if (selectedDepartmentOption) {
        fetchMunicipalities(selectedDepartmentOption.key);
      }
    }
  }, [directionData, departmentOptions]);

  useEffect(() => {
    (async () => {
      try {
        const response = await cartController.getCart(user._id);
        setCartContent(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user._id]);

  // Obtener los departamentos
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('https://api-colombia.com/api/v1/Department');
        const data = await response.json();
        const departmentOptions = data.map(department => ({
          key: department.id,
          value: department.name,
          text: department.name,
        }));
        setDepartmentOptions(departmentOptions);
      } catch (error) {
        console.error('Error al obtener los departamentos:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Obtener las municipalidades según la clave del departamento
  const fetchMunicipalities = async (departmentKey) => {
    try {
      const response = await fetch(`https://api-colombia.com/api/v1/Department/${departmentKey}/cities`);
      const data = await response.json();
      const municipalityOptions = data.map(municipality => ({
        key: municipality.id,
        value: municipality.name,
        text: municipality.name,
      }));
      setMunicipalityOptions(municipalityOptions); // Actualizar las opciones de municipios
      setMunicipalityDisabled(false); // Habilitar el campo de municipio
    } catch (error) {
      console.error('Error al obtener los municipios:', error);
    }
  };

  const handleBuy = async () => {
    const id = await preferenceController.createPreference(cartContent);
    if (id) {
      setPreferenceId(id);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(directionData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValue => {
      try {
        await checkoutController.addDirectionData(formValue, user._id);
        handleBuy();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleDepartmentChange = (e, { value, options }) => {
    formik.setFieldValue('department', value);

    // Obtener la clave (key) del departamento seleccionado
    const selectedDepartment = options.find(option => option.value === value);
    if (selectedDepartment) {
      fetchMunicipalities(selectedDepartment.key); // Llamar a la función para obtener las municipalidades
      setMunicipalityDisabled(false); // Habilitar el campo de municipio
    } else {
      setMunicipalityDisabled(true); // Deshabilitar si no hay selección
    }
  };

  return (
    <Form className={styles.directionForm} onSubmit={formik.handleSubmit}>
      <div className={styles.directionFormP}>
        <div>
          <p>2</p>
        </div>
        <p>Método de entrega</p>
      </div>

      {/* Dropdown para seleccionar Departamento */}
      <Form.Field>
        <label>Departamento</label>
        <Dropdown
          name="department"
          placeholder="Seleccione un departamento"
          fluid
          selection
          options={departmentOptions}
          onChange={handleDepartmentChange}
          value={formik.values.department}
          error={formik.errors.department}
        />
      </Form.Field>

      {/* Dropdown para seleccionar Municipio */}
      <Form.Field>
        <label>Municipio</label>
        <Dropdown
          placeholder="Seleccione un municipio"
          name="municipality"
          fluid
          selection
          options={municipalityOptions}
          onChange={(e, { value }) => formik.setFieldValue('municipality', value)}
          value={formik.values.municipality}
          error={formik.errors.municipality}
          disabled={municipalityDisabled}
        />
      </Form.Field>

      <Form.Field>
        <label>Dirección</label>
        <Form.Input
          name="street"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.street}
          error={formik.errors.street}
        />
      </Form.Field>

      <Form.Field>
        <label>Información adicional (ej: apto 201)</label>
        <Form.Input
          name="aditionalDescription"
          placeholder="Información adicional (ej: apto 201)"
          onChange={formik.handleChange}
          value={formik.values.aditionalDescription}
          error={formik.errors.aditionalDescription}
        />
      </Form.Field>

      <Form.Field>
        <label>Barrio</label>
        <Form.Input
          name="neighborhood"
          placeholder="Barrio"
          onChange={formik.handleChange}
          value={formik.values.neighborhood}
          error={formik.errors.neighborhood}
        />
      </Form.Field>

      <Form.Button
        type="submit"
        fluid
        loading={formik.isSubmitting}
        style={{ backgroundColor: '#0ba69e', color: 'white' }}
      >
        Pagar
      </Form.Button>

      {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
    </Form>
  );
}

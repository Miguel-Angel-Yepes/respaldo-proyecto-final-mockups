import React, { useCallback } from 'react';
import { Image, Form } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ProductForm.form';
import { Product } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ENV, options, categoryOptions } from '../../../../utils';

const productController = new Product();

export function ProductForm(props) {

    const { accessToken } = useAuth();
    const { onClose, onReload, product } = props;

    const formik = useFormik({
        initialValues: initialValues(product),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!product) {
                    await productController.createProduct(accessToken, formValue);
                } else {
                    await productController.updateProduct(accessToken, product._id, formValue);
                }
                onReload();
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    });

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            formik.setFieldValue("images", reader.result); // Base64 string
        };
        
        reader.readAsDataURL(file); // Convert file to base64
    }, [formik]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop
    });

    const getImages = () => {
        if (formik.values.images) {
            return formik.values.images;
        }
        return null;
    }

    return (
        <Form className='course-form' onSubmit={formik.handleSubmit}> 
            <div className='course-form__miniature' {...getRootProps()} >
                <input {...getInputProps()} />
                {getImages() ? (
                    <Image size='small' src={getImages()} />
                ) : (
                    <div>
                        <span>Arrastra la imagen del producto</span>
                    </div>
                )}
            </div>

            <Form.Input 
                name="name" 
                placeholder="Nombre del producto" 
                onChange={formik.handleChange}
                value={formik.values.name} 
                error={formik.errors.name}
            />

            <Form.Dropdown 
                name="category"
                placeholder='Selecciona la categoria' 
                options={categoryOptions} 
                selection
                onChange={(_, data) => {
                    const category = data.value;
                    formik.setFieldValue("category", category);
                }}
                value={formik.values.category}
                error={formik.errors.category}
            />

            <Form.TextArea 
                name="info" 
                placeholder="Pequeña descripción del producto" 
                onChange={formik.handleChange}
                value={formik.values.info} 
                error={formik.errors.info}
            />

            <Form.Group widths="equal">
                <Form.Input 
                    type='number' 
                    name="price"
                    placeholder="Precio del producto"
                    onChange={formik.handleChange}
                    value={formik.values.price} 
                    error={formik.errors.price}
                />

                <Form.Input
                    type='number'
                    name="stock"
                    placeholder="Unidades disponibles"
                    onChange={formik.handleChange}
                    value={formik.values.stock} 
                    error={formik.errors.stock}
                />
            </Form.Group>
            
            <Form.Group widths="equal">
                <Form.Dropdown 
                    name="discount"
                    placeholder='¿Tiene descuento?' 
                    options={options} 
                    selection
                    onChange={(_, data) => {
                        const discountValue = data.value;
                        formik.setFieldValue("discount", discountValue);
                        if (!discountValue) {
                            formik.setFieldValue("cantDiscount", 0);
                        }
                    }}
                    value={formik.values.discount}
                    error={formik.errors.discount}
                />

                <Form.Input
                    type='number'
                    name="cantDiscount"
                    placeholder="Cantidad del descuento"
                    onChange={formik.handleChange}
                    value={formik.values.cantDiscount} 
                    error={formik.errors.cantDiscount}
                    disabled={!formik.values.discount} 
                />
            </Form.Group>

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {!product ? "Crear Producto" : 'Actualizar Producto'}  
            </Form.Button>
        </Form>
    )
}
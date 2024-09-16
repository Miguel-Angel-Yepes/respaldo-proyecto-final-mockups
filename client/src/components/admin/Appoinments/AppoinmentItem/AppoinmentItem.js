import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import styles from './AppoinmentItem.module.css';
import { Appoinment } from '../../../../api/appoinment';
import { useAuth } from '../../../../hooks';

export function AppoinmentItem(props) {
    const { appoinment, index, onReload, isScheduled, isHistory, isDone } = props;
    const { accessToken} = useAuth();
    const appoinmentApi = new Appoinment();

    const [openAcceptModal, setOpenAcceptModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const formattedDate = new Date(appoinment.date).toLocaleString('es-ES', {
        timeZone: 'America/Bogota',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleAccept = async () => {
        setOpenAcceptModal(false);
        try {
            if (isHistory) {
                setModalMessage('No se puede realizar esta acción en el historial.');
                setOpenErrorModal(true);
            } else if (isDone) {
                await appoinmentApi.markAsDoneAppoinment(accessToken, appoinment._id);
                setModalMessage('Cita completada con éxito');
                setOpenSuccessModal(true);
            } else if (isScheduled) {
                await appoinmentApi.acceptAppoinment(accessToken, appoinment._id);
                setModalMessage('Cita aceptada con éxito');
                setOpenSuccessModal(true);
            }
        } catch (error) {
            console.error("Error al procesar la acción", error);
            setModalMessage(`Error al procesar la acción: ${error.msg || 'Error desconocido'}`);
            setOpenErrorModal(true);
        }
    };

    const handleReject = async () => {
        setOpenRejectModal(false);
        try {
            if (isHistory) {
                setModalMessage('No se puede realizar esta acción en el historial.');
                setOpenErrorModal(true);
            } else if (isScheduled) {
                await appoinmentApi.rejectAppoinment(accessToken, appoinment._id);
                setModalMessage('Cita rechazada con éxito');
                setOpenSuccessModal(true);
            } else {
                await appoinmentApi.deleteAppoinment(accessToken, appoinment._id);
                setModalMessage('Cita eliminada con éxito');
                setOpenSuccessModal(true);
            }
        } catch (error) {
            console.error("Error al procesar la acción", error);
            setModalMessage(`Error al procesar la acción: ${error.msg || 'Error desconocido'}`);
            setOpenErrorModal(true);
        }
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
        onReload(); // Recarga las citas después de cerrar el modal de éxito
    };

    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <h3 className={styles.title}>Solicitud {index}</h3>
                <p><strong>Nombre de la mascota:</strong> {appoinment.petName}</p>
                <p><strong>Tipo de mascota:</strong> {appoinment.animal}</p>
                <p><strong>Tamaño:</strong> {appoinment.size}</p>
                <p><strong>Fecha y Hora:</strong> {formattedDate}</p>
                <p><strong>Tipo de cita:</strong> {appoinment.appoinmentType}</p>
                <p><strong>Descripción:</strong> {appoinment.description}</p>
            </div>

            <div className={styles.actions}>
                {!isHistory && (
                    <>
                        {isScheduled && (
                            <Button icon color="green" onClick={() => setOpenAcceptModal(true)}>
                                <Icon name="check" /> Aceptar
                            </Button>
                        )}
                        {isDone && (
                            <Button icon color="blue" onClick={() => setOpenAcceptModal(true)}>
                                <Icon name="check" /> Completar
                            </Button>
                        )}
                        <Button icon color="red" onClick={() => setOpenRejectModal(true)}>
                            <Icon name="close" /> Rechazar
                        </Button>
                    </>
                )}
            </div>

            {/* Modal de confirmación para aceptar o completar */}
            <Modal
                open={openAcceptModal}
                onClose={() => setOpenAcceptModal(false)}
                size="small"
            >
                <Modal.Header>Confirmar Acción</Modal.Header>
                <Modal.Content>
                    <p>¿Estás seguro de que deseas {isScheduled ? 'aceptar' : 'completar'} esta cita?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpenAcceptModal(false)}>Cancelar</Button>
                    <Button positive onClick={handleAccept}>
                        {isScheduled ? 'Aceptar' : 'Completar'}
                    </Button>
                </Modal.Actions>
            </Modal>

            {/* Modal de confirmación para rechazar */}
            <Modal
                open={openRejectModal}
                onClose={() => setOpenRejectModal(false)}
                size="small"
            >
                <Modal.Header>Confirmar Eliminación</Modal.Header>
                <Modal.Content>
                    <p>¿Estás seguro de que deseas eliminar esta cita permanentemente?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpenRejectModal(false)}>Cancelar</Button>
                    <Button positive onClick={handleReject}>Eliminar</Button>
                </Modal.Actions>
            </Modal>

            {/* Modal de éxito */}
            <Modal
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
                size="small"
            >
                <Modal.Header>Éxito</Modal.Header>
                <Modal.Content>
                    <p>{modalMessage}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={handleCloseSuccessModal}>Cerrar</Button>
                </Modal.Actions>
            </Modal>

            {/* Modal de error */}
            <Modal
                open={openErrorModal}
                onClose={() => setOpenErrorModal(false)}
                size="small"
            >
                <Modal.Header>Error</Modal.Header>
                <Modal.Content>
                    <p>{modalMessage}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpenErrorModal(false)}>Cerrar</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}
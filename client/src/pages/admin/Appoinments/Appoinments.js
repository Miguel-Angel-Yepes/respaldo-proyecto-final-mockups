// src/pages/admin/Appoinments/Appoinments.js
import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared/BasicModal';
import { ListAppoinments, AppoinmentForm, AppoinmentHistory, AcceptedAppoinment } from '../../../components/admin/Appoinments';
import styles from './Appoinments.module.css';

export function Appoinments() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onReload = () => setReload((prevState) => !prevState);

    const panes = [
        {
            menuItem: "Citas pendientes",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListAppoinments 
                        appoinmentsFilter={{ active: false, isDone: false }}  // Citas pendientes
                        reload={reload} 
                        onReload={onReload}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Citas agendadas",
            render: () => (
                <Tab.Pane attached={false}>
                    <AcceptedAppoinment
                        appoinmentsFilter={{ active: true, isDone: false }}  // Citas agendadas
                        reload={reload} 
                        onReload={onReload} 
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Historial de citas",
            render: () => (
                <Tab.Pane attached={false}>
                    <AppoinmentHistory
                        reload={reload} 
                    />
                </Tab.Pane>
            ),
        }
    ];

    return (
        <>
            <div className={styles.page}>
                <div className={styles.add}>
                    <Button primary onClick={onOpenCloseModal}>
                        Nueva Cita
                    </Button>
                </div>

                <Tab menu={{ secondary: true }} panes={panes} />
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title="Crear cita">
                <AppoinmentForm onReload={onReload} closeModal={onOpenCloseModal} />
            </BasicModal>
        </>
    );
}
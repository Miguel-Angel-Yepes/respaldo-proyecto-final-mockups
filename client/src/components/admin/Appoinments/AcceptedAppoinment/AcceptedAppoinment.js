// src/components/admin/AcceptedAppoinment/AcceptedAppoinment.js
import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { Appoinment } from '../../../../api';
import { AppoinmentItem } from '../AppoinmentItem';
import { useAuth } from '../../../../hooks';
import styles from './AcceptedAppoinment.component.css'; // Asegúrate de que el nombre del archivo sea correcto

const appoinmentController = new Appoinment();

export function AcceptedAppoinment({ reload, onReload }) {
    const { accessToken } = useAuth();
    const [appoinments, setAppoinments] = useState(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        limit: 3,
        page: 1,
        pages: 1,
        total: 0,
    });

    useEffect(() => {
        (async () => {
            try {
                // Uso directo de props para el filtro
                const response = await appoinmentController.getAppoinments(accessToken, { 
                    page, 
                    limit: pagination.limit, 
                    active: true,
                    isDone: false
                });

                setAppoinments(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.totalPages,
                    total: response.totalDocs,
                });
            } catch (error) {
                console.error(error);
            }
        })();
    }, [accessToken, reload, page, pagination.limit]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    }

    if (!appoinments) return <Loader active inline="centered" />;
    if (size(appoinments) === 0) return "No hay citas agendadas";

    return (
        <div>
            {map(appoinments, (appoinment, index) => (
                <AppoinmentItem 
                    key={appoinment._id} 
                    appoinment={appoinment} 
                    index={(page - 1) * pagination.limit + index + 1}
                    isScheduled={false} 
                    isDone={true} 
                    onReload={onReload}
                />
            ))}

            <div className={styles.pagination}>
                <Pagination
                    totalPages={pagination.pages}
                    activePage={page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    onPageChange={changePage}
                />
            </div>
        </div>
    );
}
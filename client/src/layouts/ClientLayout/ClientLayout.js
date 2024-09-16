import React from 'react';
import { ClientMenu, Footer } from '../../components/Client/ClientLayout';

export function ClientLayout(props) {

    const { children, title } = props;
    
      return (
        <>
        <ClientMenu title={title} />
        
        {children}

        <Footer />
        </>
      )
    
}

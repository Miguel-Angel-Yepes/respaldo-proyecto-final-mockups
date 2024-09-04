import React from 'react';
import { Image } from 'semantic-ui-react';
import { image } from '../../assets';
import {AdminMenu, Logout} from '../../components/admin/AdminLayout';
import './AdminLayout.css';


export function AdminLayout(props) {
    const { children } = props;
  return (
    <div className='admin-layout'>
        <div className='admin-layout__left'>
          <Image src={image.LogoServimascotasFondo} className='logo'/>
          <AdminMenu />
        </div>
        <div className='admin-layout__right'>
          <div className='admin-layout__right-header'>
            <Logout />
          </div>
          <div className='admin-layout__right-content'>
            {children}
          </div>
        </div>
    </div>

  )
}

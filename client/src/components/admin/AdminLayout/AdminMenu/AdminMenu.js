import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import './AdminMenu.css';

export function AdminMenu() {

    const { pathname } = useLocation();

    const isCurrentPath = (path) => {
        if(path === pathname) return true;
        return false;
    }

  return (
    <Menu fluid vertical icon text className='admin-menu'>
            <Menu.Item 
              as={Link} 
              to="/admin" 
              active={isCurrentPath("/admin")}
            >
              <Icon name="home" />
              Home
            </Menu.Item>

            <Menu.Item 
              as={Link} 
              to="/admin/products"
              active={isCurrentPath("/admin/products")}
            >
              <Icon name="archive" />
              Productos
            </Menu.Item>

            <Menu.Item 
              as={Link} 
              to="/admin/appoinments"
              active={isCurrentPath("/admin/appoinments")}
            >
              <Icon name="calendar alternate outline" />
              Citas
            </Menu.Item>
    </Menu>
  )
}

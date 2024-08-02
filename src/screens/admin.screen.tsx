import React, { useEffect, useState } from 'react';
import {
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
    StarOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Divider, Layout, Menu, message, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Link, Outlet, redirect, useNavigate } from 'react-router-dom';
import axios from '../api/axios.customize';

const { Header, Sider, Content } = Layout;



const AdminPage = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [activeMenu, setActiveMenu] = useState<string>('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = { username: 'admin@gmail.com', password: 'Admin@123' }
        const res: IBackendRes<IBackendResLogin> = await axios.post('/auth/login', data);

        if (res && res.data) {
            localStorage.setItem('access_token', res.data.access_token);
            message.success('Login success')
            return res
        }
        else {
            message.error('login failed')
            return res.error
        }
    }

    useEffect(() => {
        handleLogin();

    }, [])



    useEffect(() => {

        if (window.location.pathname.endsWith('/')) {
            navigate('/dashboard')
        }

        if (window.location.pathname.includes('/users')) {
            setActiveMenu('users')
        }

        if (window.location.pathname.includes('/dashboard')) {
            setActiveMenu('dashboard')
        }

        if (window.location.pathname.includes('/products')) {
            setActiveMenu('products')
        }

        if (window.location.pathname.includes('/reviews')) {
            setActiveMenu('reviews')
        }

        if (window.location.pathname.includes('/orders')) {
            setActiveMenu('orders')
        }



    }, [])

    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}
                    style={{ height: '100vh' }}
                    theme='dark'
                >
                    <div
                        style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', margin: '20px 0', fontSize: '15px', color: '#ccc' }}
                    >
                        Admin
                    </div>
                    <Menu
                        inlineIndent={50}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['dashboard']}
                        onClick={(e) => setActiveMenu(e.key)}
                        selectedKeys={[activeMenu]}
                    >
                        <Menu.Item key={'dashboard'} icon={<DashboardOutlined />} >
                            <Link to={'/dashboard'}>Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key={'users'} icon={<UserOutlined />}>
                            <Link to={'/users'}>Users</Link>
                        </Menu.Item>
                        <Menu.Item key={'products'} icon={<ProductOutlined />}>
                            <Link to={'/products'}>Products</Link>
                        </Menu.Item>
                        <Menu.Item key={'reviews'} icon={<StarOutlined />}>
                            <Link to={'/reviews'}>Reviews</Link>
                        </Menu.Item>
                        <Menu.Item key={'orders'} icon={<StarOutlined />}>
                            <Link to={'/orders'}>Orders</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <div>Testing footer</div>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default AdminPage
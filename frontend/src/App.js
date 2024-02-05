import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme, Dropdown, Space, Text } from 'antd';

import {
  PieChartOutlined,
  SmileOutlined,
  DownOutlined
} from '@ant-design/icons'

// layout
import Navbar from './components/layout/Navbar';
// layout

// page
import Information from './components/sales/Information'
import Home from './components/home/Home';
import InsertInfo from './components/sales/InsertInfo';
import Backlist from './components/backlist/Backlist';
import PayToday from './components/paytoday/PayToday';
import Setting from './components/setting/Setting';
import Login from './components/login/login';
// page

const { Header, Content, Footer } = Layout;

const App = () => {
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const logout = () => {
    localStorage.clear();
    navigate('/login')

  }

  const items = [
    {
      key: '1',
      label: (
        <a onClick={logout}>
          Logout
        </a>
      ),
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [localStorage.getItem('token')])

  return (
    <>
      <Layout
        style={{

          minHeight: '100vh',

        }}
      >

        {localStorage.getItem('token') ? <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo">
            <h1 style={{ color: '#fff' }}>logo</h1>
          </div>
          <Navbar />
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {localStorage.getItem('username')}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header> : <></>}


        <Content
          style={{
            padding: '0 48px',
            margin: '16px 0',
          }}
        >
          <div style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/information/:type" element={<Information />} />
              <Route path="/insertinfo/:type/:id" element={<InsertInfo />} />
              <Route path="/backlist" element={<Backlist />} />
              <Route path="/paytoday" element={<PayToday />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </>
  )
}

export default App
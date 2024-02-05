import React from 'react'
import { Menu, Dropdown, Space, Text } from 'antd';

import { Link } from 'react-router-dom';

import {
    PieChartOutlined,
    SmileOutlined,
    DownOutlined
} from '@ant-design/icons'

const Navbar = () => {



    const items = [
        {
            key: 'home',
            icon: <PieChartOutlined />,
            label: <Link to={'/'}>หน้าแรก</Link>
        },
        {
            key: 'information-kangsadan',
            icon: <PieChartOutlined />,
            label: <Link to={'/information/kangsadan'}>ลูกค้ากังสดาล</Link>
        },
        {
            key: 'information-lungmor',
            icon: <PieChartOutlined />,
            label: <Link to={'/information/lungmor'}>ลูกค้าหลังมอ</Link>
        },
        {
            key: 'paytoday',
            icon: <PieChartOutlined />,
            label: <Link to={'/paytoday'}>ลูกค้าที่ต้องชำระยอดวันนี้</Link>
        },
        {
            key: 'icloud',
            icon: <PieChartOutlined />,
            label: <Link to={'/#'}>ลูกค้าจำนำ iCloud</Link>
        },
        {
            key: 'blacklist',
            icon: <PieChartOutlined />,
            label: <Link to={'/backlist'}>ลูกค้า Blacklist</Link>
        },
    ]

    return (
        <>
            <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                style={{
                    flex: 1,
                    minWidth: 0,
                    marginLeft: 30
                }}
            />
        </>
    )
}

export default Navbar
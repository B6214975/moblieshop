import React, { useEffect, useState } from 'react';
import {
  Table, Button, Flex, Typography, Input, Row,
  Col, message,
} from 'antd';
import { useParams } from 'react-router-dom'
import {
  EditOutlined
} from '@ant-design/icons'
import qs from 'qs';

import { Link } from 'react-router-dom';
import moment from 'moment';
import "moment/locale/th";

// function
import { listBacklist } from '../function/backlist/backlist'

const { Text, Title } = Typography;
const { Search } = Input;


const Backlist = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = (searchName) => {
    setLoading(true);
    listBacklist(localStorage.getItem('token'), { search: searchName ? searchName : 'All-customer-Search' })
      .then((res) => {
        console.log(res?.data)
        setData(res?.data)
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    {
      title: 'วันที่',
      dataIndex: 'orderdate',
      sorter: true,
      width: '10%',
      render: (date, item) => {
        let localDate = (new Date(date)).toLocaleString();
        return (<Text >{localDate.split(' ')[0]}</Text>)
      },
      sorter: (a, b) => moment(a.orderdate).unix() - moment(b.orderdate).unix()
    },
    {
      title: 'ชื่อ-สกุล',
      dataIndex: 'name',
      width: "10%",
      render: (name, item) => {
        return (<Text >{name}</Text>)
      },
    },
    {
      title: 'เบอร์',
      dataIndex: 'phonenumber',
      width: "10%",
      render: (phonenumber, item) => {
        return (<Text >{phonenumber}</Text>)
      },
    },
    {
      title: 'รุ่นที่ผ่อน',
      dataIndex: 'phone',
      width: "10%",
      render: (phone, item) => {
        return (<Text >{phone}</Text>)
      },
    },
    {
      title: 'ความจำ',
      dataIndex: 'memory',
      width: "10%",
      render: (memory, item) => {
        return (<Text >{memory}</Text>)
      },
    },
    {
      title: 'สี',
      dataIndex: 'color',
      width: "10%",
      render: (color, item) => {
        return (<Text >{color}</Text>)
      },
    },
    {
      title: 'ราคา',
      dataIndex: 'total',
      width: "10%",
      render: (total, item) => {
        return (<Text >{total}</Text>)
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      width: "10%",
      render: (status, item) => {
        return (<Text type="danger">backlist</Text>);
      },
    },
    {
      title: 'สาขา',
      dataIndex: 'type',
      width: "10%",
      render: (type, item) => {
        let location = type == 'kangsadan' ? "ลุกค้ากังสดาล" : (type == 'lungmor' ? "ลุกหลังมอ" : "ข้อมูลผิดพลาด")
        return (<Text >{location}</Text>)
      },
    },

  ];


  const onSearch = (value, _e, info) => {
    console.log(value)
    fetchData(value)
  };
  return (
    <>
      {contextHolder}
      <Table
        title={() => {

          return (
            <>
              <Title level={4}>Backlist</Title>
              <Row>
                <Col span={12}>
                  <Search placeholder="ค้นหาชื่อลูกค้า" id='searchName' allowClear onSearch={onSearch} enterButton />
                </Col>
              </Row>
            </>
          )
        }}

        columns={columns}
        rowKey={(item) => item?._id}
        dataSource={data}
        loading={loading}
      />
    </>
  )
}

export default Backlist
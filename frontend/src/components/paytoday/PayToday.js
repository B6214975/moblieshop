
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
import { listPaytoday } from '../function/paytoday/paytoday'

const { Text, Title } = Typography;
const { Search } = Input;


const PayToday = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = (searchName) => {
    setLoading(true);
    listPaytoday(localStorage.getItem('token'), { search: searchName ? searchName : 'All-customer-Search' })
      .then((res) => {
        // console.log(res?.data)
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
      title: 'สาขา',
      dataIndex: 'type',
      width: "10%",
      render: (type, item) => {
        let location = type == 'kangsadan' ? "ลุกค้ากังสดาล" : (type == 'lungmor' ? "ลุกหลังมอ" : "ข้อมูลผิดพลาด")
        return (<Text >{location}</Text>)
      },
    },

    {
      title: 'ยอดที่ต้องชำระ',
      dataIndex: 'installment',
      width: "10%",
      render: (installment, item) => {
        return (<Text >{installment}</Text>)
      },
    },
    {
      title: 'สถานะ',
      dataIndex: '_id',
      width: "10%",
      render: (id, item) => {

        var now = new Date();
        var startOfToday = new Date();
        startOfToday = startOfToday.toISOString().split('T')[0]
        let terms = item?.terms

        let status

        terms.forEach(element => {
          if (element?.date == startOfToday) {
            status = element?.status
          }
        });


        return (status ? <Text type='success'>จ่ายแล้ว</Text> : <Text >ยังไม่จ่าย</Text>)
      },
    },

    {
      title: 'จัดการ',
      dataIndex: '_id',
      width: "10%",
      render: (id, item) => {
        let type = item?.type
        return (
          <Link to={`/insertinfo/${type}/${id}`}>
            <Button>
              <EditOutlined />
            </Button>
          </Link>
        );
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
              <Title level={4}>ลูกค้าที่ต้องชำระยอดวันนี้</Title>
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


export default PayToday
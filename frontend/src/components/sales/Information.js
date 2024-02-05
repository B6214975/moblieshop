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
import { listInformation } from '../function/information/information'

const { Text, Title } = Typography;
const { Search } = Input;

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Information = () => {

  const params = useParams()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = (searchName) => {
    setLoading(true);
    listInformation(localStorage.getItem('token'), params?.type, { search: searchName ? searchName : 'All-customer-Search' })
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
    console.log(params)
  }, [params]);


  const columns = [
    {
      title: 'วันที่',
      dataIndex: 'orderdate',
      sorter: true,
      width: '10%',
      render: (date, item) => {
        let localDate = (new Date(date)).toLocaleString();
        let backlist = item?.backlist
        return (backlist ? <Text type="danger">{localDate.split(' ')[0]}</Text> : <Text >{localDate.split(' ')[0]}</Text>)
      },
      sorter: (a, b) => moment(a.orderdate).unix() - moment(b.orderdate).unix()
    },
    {
      title: 'ชื่อ-สกุล',
      dataIndex: 'name',
      width: "10%",
      render: (name, item) => {
        let backlist = item?.backlist
        return (backlist ? <Text type="danger">{name}</Text> : <Text >{name}</Text>)
      },
    },
    {
      title: 'เบอร์',
      dataIndex: 'phonenumber',
      width: "10%",
      render: (phonenumber, item) => {
        let backlist = item?.backlist
        return (backlist ? <Text type="danger">{phonenumber}</Text> : <Text >{phonenumber}</Text>)
      },
    },
    {
      title: 'รุ่นที่ผ่อน',
      dataIndex: 'phone',
      width: "10%",
      render: (phone, item) => {
        let backlist = item?.backlist
        return (backlist ? <Text type="danger">{phone}</Text> : <Text >{phone}</Text>)
      },
    },
    {
      title: 'ความจำ',
      dataIndex: 'memory',
      width: "10%",
      render: (memory, item) => {
        let backlist = item?.backlist
        return (backlist ? <Text type="danger">{memory}</Text> : <Text >{memory}</Text>)
      },
    },
    {
      title: 'สี',
      dataIndex: 'color',
      width: "10%",
      render: (color, item) => {
        let backlist = item?.backlist
        return (backlist ? <Text type="danger">{color}</Text> : <Text >{color}</Text>)
      },
    },
    {
      title: 'ราคา',
      dataIndex: 'total',
      width: "10%",
      render: (total, item) => {
        let backlist = item?.backlist
        return (backlist ? <Text type="danger">{total}</Text> : <Text >{total}</Text>)
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      width: "10%",
      render: (status, item) => {
        let backlist = item?.backlist
        return (backlist ? <Text type="danger">backlist</Text> : (status ? <Text type="success">สำเร็จ</Text> : <Text >ดำเนินการ</Text>));
      },
      filters: [
        {
          text: 'สำเร็จ',
          value: true,
        },
        {
          text: 'ดำเนินการ',
          value: false,
        },
        {
          text: 'backlist',
          value: 'backlist',
        },
      ],
      onFilter: (value, record) => {
        console.log("value: ", value)
        if (value == 'backlist') {
          return (record.backlist == true)
        } else {
          return (record.status == value && record.backlist != true)
        }
      }
      // {
      //   console.log("value:",value)
      //   console.log("record:",record)
      // },
      //  record.status.startsWith(value)
    },
    {
      title: "จัดการ",
      dataIndex: '_id',
      align: "center",
      width: "10%",
      render: (id) => {
        return (
          <Link to={`/insertinfo/${params?.type}/${id}`}>
            <Button>
              <EditOutlined />
            </Button>
          </Link>
        );
      },
    },
  ];

  const handleSortTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  const onSearch = (value, _e, info) => {
    console.log(value)
    fetchData(value)
  };

  return (
    <>
      {contextHolder}
      <Table
        title={() => {

          let tableName = params?.type == 'kangsadan' ? 'ลูกค้ากังสดาล' : (
            params?.type == 'lungmor' ? 'ลูกค้าหลังมอ' : 'ข้อมูลผิดพลาด'
          )

          return (
            <>
              <Title level={4}>{tableName}</Title>
              <Row>
                <Col span={12}>
                  <Search placeholder="ค้นหาชื่อลูกค้า" id='searchName' allowClear onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>
                  <Flex justify={'flex-end'} align={'center'} style={{ marginBottom: "10px" }}>
                    <Link to={`/insertinfo/${params?.type}/create`}>
                      <Button type="primary">เพิ่มข้อมูลลูกค้าผ่อน</Button>
                    </Link>
                  </Flex>
                </Col>
              </Row>
            </>
          )
        }}
        onChange={handleSortTable}
        columns={columns}
        rowKey={(item) => item?._id}
        dataSource={data}
        loading={loading}
      />
    </>
  )
}

export default Information
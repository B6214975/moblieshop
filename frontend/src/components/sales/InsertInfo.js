import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Flex,
  Row,
  Col,
  message,
  Table,
  Modal,
  Typography
} from 'antd';
// import locale from 'antd/es/date-picker/locale/th_TH';
import moment from 'moment';
import "moment/locale/th";

import { useNavigate, useParams } from 'react-router-dom'

// function
import { insertInformation, getInformation, updateInformation, payInstallment, putBackList, removeInformation } from '../function/information/information';
import { listSetting } from '../function/setting/setting';
// function

const { Text, Title } = Typography;

const InsertInfo = () => {
  moment.locale("th");
  const params = useParams()
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [formDisabled, setFormDisabled] = useState(false);
  const [backlist, setBacklist] = useState(false);

  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [idModal, setIdModal] = useState(null);


  const [dataPhone, setDataPhone] = useState([]);
  const [dataMemory, setDataMemory] = useState([]);
  const [dataColor, setDataColor] = useState([]);

  const navigate = useNavigate()

  const showModal = (index) => {
    setIsModalOpen(true);
    setIdModal(index)
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    dataSource[idModal].status = true

    await payInstallment(
      "token", params?.id,
      {
        terms: dataSource
      }
    )
      .then((res) => {
        const data = res.data;
        // console.log(data)
        fetchData()
        messageApi.open({
          type: 'success',
          content: 'This is a success message',
          duration: 1
        });
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
          duration: 1
        });
      });

    setIdModal(null)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIdModal(null)
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const columns = [
    {
      title: 'ครั้งที่',
      dataIndex: 'key',
      key: 'key',
      render: (index) => {
        return (index + 1)
      },
    },
    {
      title: 'วันที่ต้องจ่าย',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        let thaiDate = moment(date).format('dddd Do MMMM YYYY');
        return (thaiDate)
      },
    },
    {
      title: 'จำนวนที่ต้องจ่าย',
      dataIndex: 'pay',
      key: 'pay',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status, item) => {
        return (
          <Checkbox checked={status} disabled={status} onChange={() => showModal(item?.key)}>
            {status ? <Text type='success'>จ่ายแล้ว</Text> : <Text >ยังไม่จ่าย</Text>}
          </Checkbox>
        )
      },
    }
  ];


  const funcloading = (status, time) => {
    messageApi
      .open({
        key: 'loading',
        type: 'loading',
        content: 'Action in progress..',
        duration: time,
      })
      .then(() => {
        if (status) {
          message.success('Loading finished', 2.5)
        } else {
          message.error('Loading error', 2.5)
        }
      })
  }

  const fetchData = async () => {
    funcloading(true, 0)
    setLoading(true)
    let id = params?.id
    await getInformation(localStorage.getItem('token'), id)
      .then((res) => {
        const data = res.data;
        // console.log(data)
        setData(data)
        setBacklist(data?.backlist)

        form.setFieldsValue({
          name: data?.name,
          phonenumber: data?.phonenumber,
          phone: data?.phone,
          memory: data?.memory,
          color: data?.color,
          total: data?.total,
          down: data?.down,
          installment: data?.installment,
          orderdate: moment(data?.orderdate),
          installmentDate: moment(data?.installmentDate),
        })

        setFormDisabled(data?.disabled)
        setDataSource(data?.terms)
        funcloading(true, 0.5)
        setLoading(false)

      })
      .catch((err) => {
        console.log(err);
        funcloading(false, 0.5)
        setLoading(false)
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      });


  };

  const fetchOption = async () => {
    await listSetting(localStorage.getItem('token'))
      .then((res) => {
        const data = res.data;
        console.log(data)
        setDataPhone(res?.data?.phone)
        setDataMemory(res?.data?.memory)
        setDataColor(res?.data?.color)
      })
      .catch((err) => {
        console.log(err);

        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      });
  }

  useEffect(() => {
    fetchOption()
    if (params?.id !== 'create') {
      fetchData()
    }
    console.log(params)
  }, [])


  const onFinish = async (values: any) => {
    console.log('Success:', values);

    if (params?.id == 'create') {
      await insertInformation(
        "token",
        {
          type: params?.type,
          orderdate: values?.orderdate,
          name: values?.name,
          phonenumber: values?.phonenumber,
          phone: values?.phone,
          memory: values?.memory,
          color: values?.color,
          total: values?.total,
          down: values?.down,
          installment: values?.installment,
          installmentDate: values?.installmentDate,
        }
      )
        .then((res) => {
          const data = res.data;
          // console.log(data)
          messageApi.open({
            type: 'success',
            content: 'This is a success message',
          });
          window.location.href = `/insertinfo/${params?.type}/${data?._id}`
        })
        .catch((err) => {
          console.log(err);
          messageApi.open({
            type: 'error',
            content: 'This is an error message',
          });
        });
    } else {

      await updateInformation(
        "token", params?.id,
        {
          orderdate: values?.orderdate,
          name: values?.name,
          phonenumber: values?.phonenumber,
          phone: values?.phone,
          memory: values?.memory,
          color: values?.color,
          total: values?.total,
          down: values?.down,
          installment: values?.installment,
          installmentDate: values?.installmentDate,
        }
      )
        .then((res) => {
          const data = res.data;
          // console.log(data)
          fetchData()
          messageApi.open({
            type: 'success',
            content: 'This is a success message',
          });
        })
        .catch((err) => {
          console.log(err);
          messageApi.open({
            type: 'error',
            content: 'This is an error message',
          });
        });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeSwitch = async (checked) => {
    console.log(`switch to ${checked}`);
    await putBackList("token", params?.id, { status: checked })
      .then((res) => {
        const data = res.data;
        console.log(data)
        fetchData()
        messageApi.open({
          type: 'success',
          content: 'This is a success message',
        });
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      });
  };

  const handleRemove = async () => {
    setIsModalOpen2(false)

    await removeInformation("token", params?.id)
      .then((res) => {
        const data = res.data;
        console.log(data)
        messageApi.open({
          type: 'success',
          content: 'This is a success message',
        });
        navigate(`/information/${params?.type}`)
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      });

  }

  return (
    <>
      {params?.id == "create" ? <></> :
        <Flex justify={'flex-end'} align={'center'} style={{ marginBottom: 20 }} >
          <div>
            <Flex style={{ marginBottom: 10 }} justify={'flex-end'}>
              {/* <label htmlFor="switch-backlist" style={{ marginRight: 5 }}>Backlist</label> */}
              <Switch onChange={handleChangeSwitch} value={backlist} id='switch-backlist' checkedChildren="Backlist" unCheckedChildren="Backlist" />
            </Flex>
            <Flex justify={'flex-end'}>
              <Button type="primary" danger onClick={showModal2}>ลบรายการ</Button>
            </Flex>
          </div>
        </Flex>
      }


      {contextHolder}
      <Row>
        <Col span={12}>
          <Form

            form={form}
            disabled={formDisabled}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 800,
            }}

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="วันที่"
              name={'orderdate'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="ชื่อ-สกุล"
              name={'name'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="เบอร์โทร"
              name={'phonenumber'}
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>


            <Form.Item
              label="โทรศัพท์"
              name={'phone'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select>
                {dataPhone.map((item, index) => (
                  <Select.Option key={index} value={item?.name}>{item?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="ความจุ"
              name={'memory'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select>
                {dataMemory.map((item, index) => (
                  <Select.Option key={index} value={item?.name}>{item?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="สี"
              name={'color'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select>
                {dataColor.map((item, index) => (
                  <Select.Option key={index} value={item?.name}>{item?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="ยอดทั้งหมด"
              name={'total'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="ยอดดาวน์"
              name={'down'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="ผ่อนเดือนละ"
              name={'installment'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <InputNumber />
            </Form.Item>


            <Form.Item
              label="วันที่ผ่อน"
              name={'installmentDate'}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 4,
              }}
            >
              {
                formDisabled ? <></>
                  : <Button type="primary" htmlType="submit">
                    {params?.id == "create" ? "บันทึก" : "อัปเดต"}
                  </Button>
              }


            </Form.Item>
          </Form>
        </Col>

        <Col span={12}>
          {params?.id == "create" ? <></> : <Table
            dataSource={dataSource}
            rowKey={(item) => item?.key}
            columns={columns}
            loading={loading}
          // onChange={handleTableChange}
          />
          }


        </Col>
      </Row>

      <Modal title="ยืนยันการจ่าย" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>ต้องการยืนยันการจ่ายหรือมั้ย เมื่อยืนยันแล้วจะไม่สามารถแก้ไขข้อมูลได้อีก</p>
      </Modal>

      <Modal title="ยืนยันการลบ" open={isModalOpen2} onOk={handleRemove} onCancel={handleCancel2}
        footer={[
          <Button key="back" onClick={handleCancel2}>
            ยกเลิก
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleRemove}>
            ลบ
          </Button>,
        ]}
      >
        <p>ต้องการยืนยันการลบหรือมั้ย เมื่อยืนยันแล้วจะไม่สามารถแก้ไขข้อมูลได้อีก</p>
      </Modal>

    </>
  )
}

export default InsertInfo
import React, { useState, useEffect } from 'react'
import {
    Tabs, Table, Button, Flex, Typography, Input, Row,
    Col, message, Modal, Form, Space, Switch
} from 'antd';

import {
    DeleteOutlined, EditOutlined
} from '@ant-design/icons'


// function
import {
    insertPhone, listSetting, deletePhone, insertMemory,
    deleteMemory, insertColor, deleteColor, insertUser,
    listUser, deleteUser, updatetUser, updatetUserEnabled,
    updatetUserAdmin
} from '../function/setting/setting';
// function

const { Text, Title } = Typography;
const { Search } = Input;




const tab1 = (

    phone,
    setPhone,
    messageApi,
    loading,
    dataPhone,
    fetchData
) => {


    const columns = [
        {
            title: 'โทรศัพท์',
            dataIndex: 'name',
            key: 'name',
            width: "90%"
        },
        {
            title: 'ลบ',
            dataIndex: '_id',
            // key: 'id',
            align: "center",
            width: "10%",
            render: (id) => {
                return (
                    <Button onClick={() => removePhone(id)}>
                        <DeleteOutlined />
                    </Button>

                );
            },
        },
    ];


    const handleChange = (e) => {
        // console.log(e.target.value)
        setPhone(e.target.value)
    }

    const addPhone = async () => {
        console.log(phone)
        if (phone) {

            await insertPhone(localStorage.getItem('token'), { name: phone })
                .then(res => {
                    console.log(res?.data)
                    fetchData()
                    messageApi.open({
                        type: 'success',
                        content: 'This is a success message',
                    });
                })
                .catch(err => {
                    console.log(err)
                    messageApi.open({
                        type: 'error',
                        content: 'This is an error message',
                    });
                })

            setPhone('')
        } else {
            messageApi.open({
                type: 'error',
                content: 'This is an error message',
            });
        }



    }

    const removePhone = async (id) => {
        console.log(id)
        await deletePhone(localStorage.getItem('token'), id)
            .then(res => {
                console.log(res?.data)
                fetchData()
                messageApi.open({
                    type: 'success',
                    content: 'This is a success message',
                });
            })
            .catch(err => {
                console.log(err)
                messageApi.open({
                    type: 'error',
                    content: 'This is an error message',
                });
            })
    }

    return (
        <div>

            <Table
                title={() => {

                    return (
                        <>
                            <Row>
                                <Col span={12}>
                                </Col>
                                <Col span={12}>
                                    <Flex justify={'flex-end'} align={'center'} style={{ marginBottom: "10px" }}>

                                        <Space direction="" size="middle">
                                            <Space.Compact
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Input placeholder="เพิ่มโทรศัพท์" value={phone} onChange={handleChange} />
                                                <Button type="primary" onClick={addPhone}>เพิ่ม</Button>
                                            </Space.Compact>

                                        </Space>

                                    </Flex>

                                </Col>
                            </Row>
                        </>
                    )
                }}

                rowKey={(item) => item?._id}
                dataSource={dataPhone}
                columns={columns}
                loading={loading}
            />;

        </div>
    )
}
const tab2 = (

    memory,
    setMemory,
    messageApi,
    loading,
    dataMemory,
    fetchData
) => {


    const columns = [
        {
            title: 'โทรศัพท์',
            dataIndex: 'name',
            key: 'name',
            width: "90%"
        },
        {
            title: 'ลบ',
            dataIndex: '_id',
            // key: 'id',
            align: "center",
            width: "10%",
            render: (id) => {
                return (
                    <Button onClick={() => removeMemory(id)}>
                        <DeleteOutlined />
                    </Button>

                );
            },
        },
    ];


    const handleChange = (e) => {
        // console.log(e.target.value)
        setMemory(e.target.value)
    }

    const addMemory = async () => {
        console.log(memory)
        if (memory) {

            await insertMemory(localStorage.getItem('token'), { name: `${memory}GB` })
                .then(res => {
                    console.log(res?.data)
                    fetchData()
                    messageApi.open({
                        type: 'success',
                        content: 'This is a success message',
                    });
                })
                .catch(err => {
                    console.log(err)
                    messageApi.open({
                        type: 'error',
                        content: 'This is an error message',
                    });
                })

            setMemory('')
        } else {
            messageApi.open({
                type: 'error',
                content: 'This is an error message',
            });
        }



    }

    const removeMemory = async (id) => {
        console.log(id)
        await deleteMemory(localStorage.getItem('token'), id)
            .then(res => {
                console.log(res?.data)
                fetchData()
                messageApi.open({
                    type: 'success',
                    content: 'This is a success message',
                });
            })
            .catch(err => {
                console.log(err)
                messageApi.open({
                    type: 'error',
                    content: 'This is an error message',
                });
            })
    }

    return (
        <div>

            <Table
                title={() => {

                    return (
                        <>
                            <Row>
                                <Col span={12}>
                                </Col>
                                <Col span={12}>
                                    <Flex justify={'flex-end'} align={'center'} style={{ marginBottom: "10px" }}>

                                        <Space direction="" size="middle">
                                            <Space.Compact
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Input placeholder="เพิ่มโทรศัพท์" value={memory} onChange={handleChange} suffix="GB" />
                                                <Button type="primary" onClick={addMemory}>เพิ่ม</Button>
                                            </Space.Compact>

                                        </Space>

                                    </Flex>

                                </Col>
                            </Row>
                        </>
                    )
                }}

                rowKey={(item) => item?._id}
                dataSource={dataMemory}
                columns={columns}
                loading={loading}
            />;

        </div>
    )
}
const tab3 = (

    color,
    setColor,
    messageApi,
    loading,
    dataColor,
    fetchData
) => {


    const columns = [
        {
            title: 'โทรศัพท์',
            dataIndex: 'name',
            key: 'name',
            width: "90%"
        },
        {
            title: 'ลบ',
            dataIndex: '_id',
            // key: 'id',
            align: "center",
            width: "10%",
            render: (id) => {
                return (
                    <Button onClick={() => removeColor(id)}>
                        <DeleteOutlined />
                    </Button>

                );
            },
        },
    ];


    const handleChange = (e) => {
        // console.log(e.target.value)
        setColor(e.target.value)
    }

    const addColor = async () => {
        console.log(color)
        if (color) {

            await insertColor(localStorage.getItem('token'), { name: color })
                .then(res => {
                    console.log(res?.data)
                    fetchData()
                    messageApi.open({
                        type: 'success',
                        content: 'This is a success message',
                    });
                })
                .catch(err => {
                    console.log(err)
                    messageApi.open({
                        type: 'error',
                        content: 'This is an error message',
                    });
                })

            setColor('')
        } else {
            messageApi.open({
                type: 'error',
                content: 'This is an error message',
            });
        }



    }

    const removeColor = async (id) => {
        console.log(id)
        await deleteColor(localStorage.getItem('token'), id)
            .then(res => {
                console.log(res?.data)
                fetchData()
                messageApi.open({
                    type: 'success',
                    content: 'This is a success message',
                });
            })
            .catch(err => {
                console.log(err)
                messageApi.open({
                    type: 'error',
                    content: 'This is an error message',
                });
            })
    }

    return (
        <div>

            <Table
                title={() => {

                    return (
                        <>
                            <Row>
                                <Col span={12}>
                                </Col>
                                <Col span={12}>
                                    <Flex justify={'flex-end'} align={'center'} style={{ marginBottom: "10px" }}>

                                        <Space direction="" size="middle">
                                            <Space.Compact
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Input placeholder="เพิ่มโทรศัพท์" value={color} onChange={handleChange} />
                                                <Button type="primary" onClick={addColor}>เพิ่ม</Button>
                                            </Space.Compact>

                                        </Space>

                                    </Flex>

                                </Col>
                            </Row>
                        </>
                    )
                }}

                rowKey={(item) => item?._id}
                dataSource={dataColor}
                columns={columns}
                loading={loading}
            />;

        </div>
    )
}
const tab4 = (
    isModalOpen,
    setIsModalOpen,
    isModalOpen2,
    setIsModalOpen2,
    userid,
    setUserID,
    form,
    messageApi,
    loading,
    dataUser,
    fetchUser,
    isCreate,
    setIsCreate
) => {



    const showModal = (item) => {
        console.log(item?._id)
        // console.log()
        if (item?._id) {
            setIsCreate(false)
        } else {
            setIsCreate(true)
        }

        setIsModalOpen(true);

        if (item?._id) {

            form.setFieldsValue({
                username: item?.username,
                password: "",
                firstname: item?.firstname,
                lastname: item?.lastname,
                phone: item?.phone,
                id: item?._id,
            })
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal2 = (id) => {
        // console.log(id)
        setUserID(id)
        setIsModalOpen2(true);
    };

    const handleCancel2 = () => {
        setUserID('')
        setIsModalOpen2(false);
    };

    const columns = [
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username',
            width: "15%"
        },
        {
            title: 'ชื่อ',
            dataIndex: 'firstname',
            key: 'firstname',
            width: "15%"
        },
        {
            title: 'สกุล',
            dataIndex: 'lastname',
            key: 'lastname',
            width: "15%"
        },
        {
            title: 'เบอร์',
            dataIndex: 'phone',
            key: 'phone',
            width: "15%"
        },
        {
            title: 'สิทธิ์เข้าใช้งาน',
            dataIndex: 'enabled',
            // key: 'id',
            align: "center",
            width: "10%",
            render: (enabled, item) => {
                // console.log(enabled)
                return (
                    <Switch checked={enabled} onChange={(checked) => onChangeEnabled(item?._id, checked)} />
                );
            },
        },
        {
            title: 'สิทธิ์ผู้ดูแล',
            dataIndex: 'admin',
            // key: 'id',
            align: "center",
            width: "10%",
            render: (admin, item) => {
                // console.log(enabled)
                return (
                    <Switch checked={admin} onChange={(checked) => onChangeAddmin(item?._id, checked)} />
                );
            },
        },
        {
            title: 'แก้ไข',
            dataIndex: '_id',
            // key: 'id',
            align: "center",
            width: "10%",
            render: (id, item) => {
                return (
                    <Button onClick={() => showModal(item)}>
                        <EditOutlined />
                    </Button>

                );
            },
        },
        {
            title: 'ลบ',
            dataIndex: '_id',
            // key: 'id',
            align: "center",
            width: "10%",
            render: (id) => {
                return (
                    <Button onClick={() => showModal2(id)}>
                        <DeleteOutlined />
                    </Button>

                );
            },
        },
    ];

    const removeUser = async () => {
        console.log(userid)
        await deleteUser(localStorage.getItem('token'), userid)
            .then(res => {
                console.log(res?.data)
                fetchUser()
                messageApi.open({
                    type: 'success',
                    content: 'This is a success message',
                });
            })
            .catch(err => {
                console.log(err)
                messageApi.open({
                    type: 'error',
                    content: 'This is an error message',
                });
            })
        setIsModalOpen2()
        setUserID('')
    }

    const onChangeEnabled = async (id, checked) => {
        console.log(id)
        console.log(checked)
        await updatetUserEnabled(localStorage.getItem('token'), id, { status: checked })
            .then(res => {
                console.log(res?.data)
                fetchUser()
                messageApi.open({
                    type: 'success',
                    content: 'This is a success message',
                });
            })
            .catch(err => {
                console.log(err)
                messageApi.open({
                    type: 'error',
                    content: 'This is an error message',
                });
            })
    }
    const onChangeAddmin = async (id, checked) => {
        console.log(id)
        console.log(checked)
        await updatetUserAdmin(localStorage.getItem('token'), id, { status: checked })
            .then(res => {
                console.log(res?.data)
                fetchUser()
                messageApi.open({
                    type: 'success',
                    content: 'This is a success message',
                });
            })
            .catch(err => {
                console.log(err)
                messageApi.open({
                    type: 'error',
                    content: 'This is an error message',
                });
            })
    }



    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        if (isCreate) {
            await insertUser(localStorage.getItem('token'), values)
                .then(res => {
                    console.log(res?.data)
                    fetchUser()
                    messageApi.open({
                        type: 'success',
                        content: 'This is a success message',
                    });
                    setIsModalOpen(false);
                })
                .catch(err => {
                    console.log(err)
                    if (err?.response?.data == 'user duplicate') {

                        messageApi.open({
                            type: 'error',
                            content: 'username ถูกใช้แล้ว',
                        });
                    }
                })
        } else {
            await updatetUser(localStorage.getItem('token'), values)
                .then(res => {
                    console.log(res?.data)
                    fetchUser()
                    messageApi.open({
                        type: 'success',
                        content: 'This is a success message',
                    });
                    setIsModalOpen(false);
                })
                .catch(err => {
                    console.log(err)
                    if (err?.response?.data == 'user duplicate') {

                        messageApi.open({
                            type: 'error',
                            content: 'username ถูกใช้แล้ว',
                        });
                    }
                })
        }

    };

    return (
        <div>

            <Table
                title={() => {

                    return (
                        <>
                            <Row>
                                <Col span={12}>
                                </Col>
                                <Col span={12}>
                                    <Flex justify={'flex-end'} align={'center'} style={{ marginBottom: "10px" }}>

                                        <Space direction="" size="middle">
                                            <Space.Compact
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Button type="primary" onClick={showModal}>เพิ่ม</Button>
                                            </Space.Compact>

                                        </Space>

                                    </Flex>

                                </Col>
                            </Row>

                            <Modal title="เพิ่มผู้ใช้งาน" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                footer={[]}
                            >

                                <Form
                                    form={form}
                                    name="register"
                                    onFinish={onFinish}
                                    style={{
                                        maxWidth: 600,
                                    }}

                                >

                                    <Form.Item
                                        name="username"
                                        label="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}

                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        name="firstname"
                                        label="firstname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your firstname!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="lastname"
                                        label="lastname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your lastname!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="phone"
                                        label="Phone Number"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your phone number!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="id"
                                        style={{
                                            display: 'none',
                                        }}
                                    >
                                        <Input

                                        />
                                    </Form.Item>

                                    <Form.Item >
                                        <Button type="primary" htmlType="submit">
                                            {isCreate ? "เพิ่มผู้ใช้งาน" : "แก้ไขผู้ใช้งาน"}
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </Modal>

                            <Modal title="ยืนยันการลบ" open={isModalOpen2} onOk={removeUser} onCancel={handleCancel2}
                                footer={[
                                    <Button key="back" onClick={handleCancel2}>
                                        ยกเลิก
                                    </Button>,
                                    <Button key="submit" type="primary" danger onClick={removeUser}>
                                        ลบ
                                    </Button>,
                                ]}
                            >
                                <p>ต้องการยืนยันการลบหรือมั้ย เมื่อยืนยันแล้วจะไม่สามารถแก้ไขข้อมูลได้อีก</p>
                            </Modal>

                        </>
                    )
                }}

                rowKey={(item) => item?._id}
                dataSource={dataUser}
                columns={columns}
                // loading={loading}
                loading={false}
            />;

        </div>
    )
}

const Setting = () => {

    const [form] = Form.useForm();

    const [admin, setAdmin] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const [phone, setPhone] = useState('');
    const [memory, setMemory] = useState('');
    const [color, setColor] = useState('');
    const [userid, setUserID] = useState('');

    const [dataPhone, setDataPhone] = useState([]);
    const [dataMemory, setDataMemory] = useState([]);
    const [dataColor, setDataColor] = useState([]);
    const [dataUser, setDataUser] = useState([]);

    const fetchData = () => {
        setLoading(true);
        listSetting(localStorage.getItem('token'))
            .then((res) => {
                console.log(res?.data)
                // setData(res?.data)
                setDataPhone(res?.data?.phone)
                setDataMemory(res?.data?.memory)
                setDataColor(res?.data?.color)
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
    }

    const fetchUser = () => {

        listUser(localStorage.getItem('token'))
            .then((res) => {
                console.log(res?.data)
                setDataUser(res?.data)
            })
            .catch((err) => {
                console.log(err);
                // messageApi.open({
                //     type: 'error',
                //     content: 'This is an error message',
                // });
            });
    }

    useEffect(() => {
        fetchData();
        fetchUser();

    }, []);

    return (
        <>
            {contextHolder}
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'โทรศัพท์',
                        key: '1',
                        children: tab1(

                            phone,
                            setPhone,
                            messageApi,
                            loading,
                            dataPhone,
                            fetchData
                        ),
                    },
                    {
                        label: 'ความจุ',
                        key: '2',
                        children: tab2(
                            memory,
                            setMemory,
                            messageApi,
                            loading,
                            dataMemory,
                            fetchData
                        ),

                    },
                    {
                        label: 'สี',
                        key: '3',
                        children: tab3(
                            color,
                            setColor,
                            messageApi,
                            loading,
                            dataColor,
                            fetchData
                        ),

                    },
                    {
                        label: 'ผู้ใช้งาน',
                        key: '4',
                        children: 'Tab 4',
                        disabled: (localStorage.getItem('role') == 'false'),
                        // 
                        children: tab4(
                            isModalOpen,
                            setIsModalOpen,
                            isModalOpen2,
                            setIsModalOpen2,
                            userid,
                            setUserID,
                            form,
                            messageApi,
                            loading,
                            dataUser,
                            fetchUser,
                            isCreate,
                            setIsCreate
                        ),
                    },
                ]}
            />
        </>
    )
}

export default Setting
import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { loginfunc } from '../function/auth/auth'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        console.log('Success:', values);
        loginfunc({ username: values?.username, password: values?.password })
            .then(res => {
                console.log(res)
                let { user } = res?.data?.payload
                console.log(user)
                localStorage.setItem("token", res.data?.token);
                localStorage.setItem("username", user?.username);
                localStorage.setItem("userid", user?.userid);
                localStorage.setItem("role", user?.role);
                navigate('/')
            })
            .catch(err => {
                if (err?.response.data == 'user not found') {
                    messageApi.open({
                        type: 'error',
                        content: 'ไม่มีบัญชีผู้ใช้',
                    });
                } else if (err?.response.data == 'password invalid') {
                    messageApi.open({
                        type: 'error',
                        content: 'รหัสผ่านไม่ถูกต้อง',
                    });
                } else if (err?.response.data == 'user enabled') {
                    messageApi.open({
                        type: 'error',
                        content: 'บัญชีถูกปิดการเข้าถึง',
                    });
                }
                console.log(err)
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(()=>{
        if(localStorage.getItem('token')) navigate('/')
    })

    return (
        <div>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
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
                    label="Password"
                    name="password"
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
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
import React from 'react'
import { Card, Space } from 'antd';
import { Button, Flex, Segmented } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const Home = () => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Flex justify={'space-evenly'} align={'center'}>
                <Link to={'/information/kangsadan'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img1.jpg"
                            />} />
                </Link>

                <Link to={'/information/lungmor'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img2.jpg"
                            />} />
                </Link>

                <Link to={'/#'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img3.jpg"
                            />} />
                </Link>
            </Flex>
            <Flex justify={'space-evenly'} align={'center'}>
                <Link to={'/paytoday'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img4.jpg"
                            />} />
                </Link>
                <Link to={'/#'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img5.jpg"
                            />} />
                </Link>
                <Link to={'/#'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img6.jpg"
                            />} />
                </Link>
            </Flex>
            <Flex justify={'space-evenly'} align={'center'}>
                <Link to={'/backlist'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img7.jpg"
                            />} />
                </Link>
                <Link to={'/#'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img8.jpg"
                            />} />
                </Link>
                <Link to={'/setting'}>
                    <Card hoverable style={{ minWidth: "320px", maxHeight: "180px", backgroundColor: "transparent" }}
                        cover={
                            <img
                                style={{ width: "320px", height: "180px", borderRadius: "10px" }}
                                alt="example"
                                src="/img-home/img9.jpg"
                            />} />
                </Link>
            </Flex>
        </Space>
    )
}

export default Home
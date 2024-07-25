import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Checkbox, Col, Divider, Form, FormProps, Input, Modal, Row, message } from 'antd';
import { createNewUser, updateUser } from '../../api/api';

interface IProps {
    isAddNewModalOpen: boolean,
    setIsAddNewModalOpen: Dispatch<SetStateAction<boolean>>
    fetchUser: () => void
}


const UserAddNewModal = (props: IProps) => {

    const { isAddNewModalOpen, setIsAddNewModalOpen, fetchUser } = props
    const [form] = Form.useForm();

    const showModal = () => {
        setIsAddNewModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsAddNewModalOpen(false);
    };

    type FieldType = {
        email?: string;
        name?: string;
        address?: string;
        role?: string;
        _id?: string
        password?: string

    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const res: IBackendRes<any> = await createNewUser(values);
        if (res && res.data) {
            fetchUser();
            message.success('Create user success')
            handleCancel()
            return
        }
        else {
            message.error(res.error)
            return
        }

    };

    return (
        <>
            <Modal
                title="Add a user"
                open={isAddNewModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                okText='Add'
            >
                <Divider />
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ width: '40vw' }}
                    labelCol={{ span: 3 }}
                >
                    <Form.Item<FieldType>
                        label="Id"
                        labelCol={{ span: 24 }}
                        name="_id"
                        style={{ display: 'none' }}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label="Email"
                                labelCol={{ span: 24 }}
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label="Password"
                                labelCol={{ span: 24 }}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label="Name"
                                labelCol={{ span: 24 }}
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label="Address"
                                labelCol={{ span: 24 }}
                                name="address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label="Role"
                                labelCol={{ span: 24 }}
                                name="role"
                                rules={[{ required: true, message: 'Please input your role!' }]}
                                initialValue={'USER'}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </>
    );
}
export default UserAddNewModal
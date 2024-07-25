import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Checkbox, Col, Divider, Form, FormProps, Input, Modal, Row, message } from 'antd';
import { updateUser } from '../../api/api';

interface IProps {
    isUpdateModalOpen: boolean,
    setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>,
    dataUpdate: any,
    setDataUpdate: Dispatch<SetStateAction<Object>>,
    fetchUser: () => void
}


const UserUpdateModal = (props: IProps) => {

    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, fetchUser } = props
    const [form] = Form.useForm();

    const showModal = () => {
        setIsUpdateModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        setDataUpdate({})
    };

    type FieldType = {
        email?: string;
        name?: string;
        address?: string;
        role?: string;
        _id?: string

    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const res: IBackendRes<any> = await updateUser(values);
        if (res && res.data) {
            fetchUser();
            message.success('Update user success')
            handleCancel()
            return
        }
        else {
            message.error(res.error)
            return
        }

    };

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    console.log(dataUpdate)
    return (
        <>
            <Modal
                title="Update a user"
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                okText='Update'
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
export default UserUpdateModal
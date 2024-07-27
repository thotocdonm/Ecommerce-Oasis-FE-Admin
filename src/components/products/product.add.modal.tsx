import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Checkbox, Col, Divider, Form, FormProps, Input, InputNumber, Modal, Row, Select, SelectProps, message } from 'antd';
import { createNewUser, updateUser } from '../../api/api';

interface IProps {
    isAddNewModalOpen: boolean,
    setIsAddNewModalOpen: Dispatch<SetStateAction<boolean>>
    fetchProduct: () => void
}


const ProductAddNewModal = (props: IProps) => {

    const { isAddNewModalOpen, setIsAddNewModalOpen, fetchProduct } = props
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
        name?: string;
        price?: number;
        size?: string[];
        quantity?: number;
        style?: string[]
        type?: string[]


    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        // const res: IBackendRes<any> = await createNewUser(values);
        // if (res && res.data) {
        //     fetchProduct();
        //     message.success('Create product success')
        //     handleCancel()
        //     return
        // }
        // else {
        //     message.error(res.error)
        //     return
        // }

        console.log('ok ', values)

    };

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const sizeOptions: SelectProps['options'] = [
        {
            label: "S",
            value: "S",
        },
        {
            label: "M",
            value: "M",
        },
        {
            label: "L",
            value: "L",
        },
        {
            label: "XL",
            value: "XL",
        },
        {
            label: "XXL",
            value: "XXL",
        },
        {
            label: "XXXL",
            value: "XXXL",
        }
    ];

    const styleOptions: SelectProps['options'] = [
        {
            label: 'Casual',
            value: 'Casual'
        },
        {
            label: 'Formal',
            value: 'Formal'
        },
        {
            label: 'Party',
            value: 'Party'
        },
        {
            label: 'Gym',
            value: 'Gym'
        },
    ]

    const typeOptions: SelectProps['options'] = [
        {
            label: 'T-shirt',
            value: 'T-shirt'
        },
        {
            label: 'Short',
            value: 'Short'
        },
        {
            label: 'Shirt',
            value: 'Shirt'
        },
        {
            label: 'Hoodie',
            value: 'Hoodie'
        },
        {
            label: 'Jeans',
            value: 'Jeans'
        },
    ]
    return (
        <>
            <Modal
                title="Add a new product"
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
                    <Row gutter={[20, 20]}>
                        <Col span={6}>
                            <Form.Item<FieldType>
                                label="Name"
                                labelCol={{ span: 24 }}
                                name="name"
                                rules={[{ required: true, message: "Please input product's name!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item<FieldType>
                                label="Price"
                                labelCol={{ span: 24 }}
                                name="price"
                                rules={[{ required: true, message: "Please input product's price!" }]}
                            >
                                <InputNumber addonAfter="$" defaultValue={0} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item<FieldType>
                                label="Quantity"
                                labelCol={{ span: 24 }}
                                name="quantity"
                                rules={[{ required: true, message: "Please input product's quantity!" }]}
                            >
                                <InputNumber addonAfter="$" defaultValue={0} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item<FieldType>
                                label="Size"
                                labelCol={{ span: 24 }}
                                name="size"
                                rules={[{ required: true, message: "Please input product's size!" }]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    options={sizeOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item<FieldType>
                                label="Style"
                                labelCol={{ span: 24 }}
                                name='style'
                                rules={[{ required: true, message: "Please input product's size!" }]}
                            >
                                <Select

                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    options={styleOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item<FieldType>
                                label="Type"
                                labelCol={{ span: 24 }}
                                name="type"
                                rules={[{ required: true, message: "Please input product's size!" }]}
                            >
                                <Select

                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    options={typeOptions}
                                />
                            </Form.Item>
                        </Col>

                    </Row>

                </Form>
            </Modal>
        </>
    );
}
export default ProductAddNewModal
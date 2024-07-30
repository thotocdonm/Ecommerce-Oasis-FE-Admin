import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Checkbox, Col, Collapse, Divider, Form, FormProps, GetProp, Image, Input, InputNumber, Modal, Row, Select, SelectProps, Upload, UploadFile, UploadProps, message } from 'antd';
import { addNewProduct, createNewUser, removeProductImage, updateAProduct, updateUser, uploadFile } from '../../api/api';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { v4 as uuidv4 } from "uuid";

interface IProps {
    isUpdateModalOpen: boolean,
    setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>
    fetchProduct: () => void,
    dataUpdate: any,
    setDataUpdate: Dispatch<SetStateAction<Object>>
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


const ProductUpdateModal = (props: IProps) => {

    const { isUpdateModalOpen, setIsUpdateModalOpen, fetchProduct, dataUpdate, setDataUpdate } = props
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setDataUpdate({})
        form.resetFields();
        setFileList([])
        setIsUpdateModalOpen(false);
    };

    type FieldType = {
        name?: string;
        price?: number;
        size?: string[];
        quantity?: number;
        style?: string[]
        type?: string[]
        color?: string[]


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

    const colorOptions: SelectProps['options'] = [
        {
            label: 'Red',
            value: 'Red//#FF0000'
        },
        {
            label: 'Blue',
            value: 'Blue//#0000FF'
        },
        {
            label: 'Green',
            value: 'Green//#00FF00'
        },
        {
            label: 'Black',
            value: 'Black//#000000'
        },
        {
            label: 'White',
            value: 'White//#FFFFFF'
        },
    ]


    const buildColorData = (colorsArray: string[], fileList: UploadFile[]) => {
        // Parse color names and codes
        const colorMap = colorsArray.reduce((acc, color) => {
            const [colorName, colorCode] = color.split('//');
            //@ts-ignore
            acc[colorName] = {
                colorName,
                colorCode,
                image: []
            };
            return acc;
        }, {});

        // Map images to colors
        fileList.forEach(file => {
            const start = file.name.indexOf('-!') + 2; // Start position of color name
            const end = file.name.indexOf('!-', start); // End position of color name

            const colorName = file.name.substring(start, end); // Extract color name from filename

            //@ts-ignore
            if (colorMap[colorName]) {

                const parts = file?.url?.split('/');
                const imageUrl = parts?.pop();
                //@ts-ignore
                colorMap[colorName].image.push(imageUrl); // Add image URL
            }
        });

        // Convert colorMap to array format
        return Object.values(colorMap);
    };


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {


        const { name, price, size, quantity, type, style, color } = values


        const colorsUrl = color?.map((item, index) => {
            const keyword = `!${item.split('//')[0]}!`
            return fileList[index]?.name.includes(keyword) ? fileList[index].name : ''
        })

        let imageArray: string[] = [];

        const colorsData = buildColorData(color!, fileList);

        const data = {
            name,
            price,
            size,
            quantity,
            type,
            style,
            colors: colorsData
        }



        const res: IBackendRes<any> = await updateAProduct(data, dataUpdate?._id);
        if (res && res.data) {
            fetchProduct();
            message.success('Update product success')
            handleCancel()
            return
        }
        else {
            message.error(res?.error)
            return
        }

    };

    const handleChange = (value: string[]) => {

    };

    const handleChangeColor = (value: string[]) => {
        const colors = value.map((color, index) => {
            const words = color.split('//');
            return words[0];
        })
        setSelectedColors(colors);
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    //@ts-ignore
    const handleChangeFile = ({ file, fileList: newFileList }) => {


    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const uploadImage = async (info: any) => {
        const { file, onSuccess, onError } = info
        const data = new FormData();
        data.append('fileUpload', file)
        const res: IBackendRes<any> = await uploadFile(data);

        if (res && res.data) {
            setFileList((fileList) => [...fileList, {
                name: res.data.fileName,
                uid: file.uid,
                url: `${import.meta.env.VITE_BACKEND_URL}/images/products/${res.data.fileName}`
            }])
            onSuccess('ok')
        } else {
            onError('Something wrong')
        }


    }

    const handleRemoveFile = (info: any) => {
        let res: any = removeProductImage(info.name)
        const newFileList = fileList.filter(item => item.name !== info.name)
        setFileList(newFileList)
    }

    const handleBeforeUpload = (item: string) => (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return isJpgOrPng;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return isJpgOrPng && isLt2M;
        }

        // custom rename file name
        const newName = generateFileName(file.name, item)
        // replace origin File
        const newFile = new File([file], newName, { type: file.type })
        return newFile
    }

    const generateFileName = (originalName: string, color: string) => {
        const name = originalName.split('.')[0]
        const extension = originalName.split('.').pop()
        return `${name}-${color}.${extension}`
    }

    useEffect(() => {
        const formData = {
            ...dataUpdate,
            color: dataUpdate?.colors?.map((color: any) => `${color.colorName}//${color.colorCode}`)
        }
        form.setFieldsValue(formData)
        const colors = dataUpdate?.colors?.map((item: any, index: any) => {
            return `${item.colorName}`
        })
        const colorsFileList: UploadFile[] = [];
        dataUpdate?.colors?.forEach((color: any) => {
            // Loop through each image in the image array
            color?.image?.forEach((image: any) => {
                // Push each image URL into the allImages array
                colorsFileList.push(
                    {
                        name: image,
                        uid: uuidv4(),
                        url: `${import.meta.env.VITE_BACKEND_URL}/images/products/${image}`
                    }
                );
            });
        });
        setFileList(colorsFileList)
        setSelectedColors(colors)
    }, [dataUpdate])
    console.log('check data Update', dataUpdate)
    console.log('check file List', fileList)
    return (
        <>
            <Modal
                title="Update a product"
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
                                rules={[{ required: true, message: "Please input product's style!" }]}
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
                                rules={[{ required: true, message: "Please input product's type!" }]}
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
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label="Color"
                                labelCol={{ span: 24 }}
                                name="color"
                                rules={[{ required: true, message: "Please input product's color!" }]}
                            >
                                <Select
                                    mode='multiple'
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={handleChangeColor}
                                    options={colorOptions}
                                    defaultValue={selectedColors}
                                />
                            </Form.Item>
                        </Col>
                        {selectedColors && selectedColors.map((item, index) => {
                            const itemList: any = [];
                            fileList.forEach((file, index) => {
                                if (fileList[index].name.search(item) !== -1) {
                                    itemList.push(fileList[index])
                                }
                            })

                            return (
                                <Col span={24}>
                                    <Form.Item
                                        label={`Images for ${item} color`}
                                        labelCol={{ span: 24 }}
                                        name="colorImage"
                                    >
                                        { }
                                        <Upload
                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            listType="picture-card"
                                            fileList={itemList}
                                            onPreview={handlePreview}
                                            onChange={handleChangeFile}
                                            customRequest={uploadImage}
                                            beforeUpload={handleBeforeUpload(`!${item}!`)}
                                            multiple={true}
                                            defaultFileList={itemList}
                                            onRemove={handleRemoveFile}
                                        >
                                            {itemList.length >= 8 ? null : uploadButton}
                                        </Upload>
                                        {previewImage && (
                                            <Image
                                                wrapperStyle={{ display: 'none' }}
                                                preview={{
                                                    visible: previewOpen,
                                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                                }}
                                                src={previewImage}
                                            />
                                        )}
                                    </Form.Item>


                                </Col>
                            )
                        })}

                    </Row>

                </Form>
            </Modal>
        </>
    );
}
export default ProductUpdateModal
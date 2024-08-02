import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, ColorPicker, Drawer, Image, Upload } from 'antd';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps, GetProp, UploadFile, UploadProps } from 'antd';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';

interface IProps {
    openDetail: boolean,
    setOpenDetail: Dispatch<SetStateAction<boolean>>,
    loadingDetail: boolean,
    setLoadingDetail: Dispatch<SetStateAction<boolean>>,
    dataDetail: any

}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });



const ProductDetail = (props: IProps) => {
    const { openDetail, setOpenDetail, loadingDetail, setLoadingDetail, dataDetail } = props;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const items: DescriptionsProps['items'] = [
        {
            key: '_id',
            label: '_id',
            children: dataDetail._id,
            span: 3
        },
        {
            key: 'Name',
            label: 'Name',
            children: dataDetail.name,
            span: 2
        },
        {
            key: 'Price',
            label: 'Price',
            children: dataDetail.price,
            span: 2
        },
        {
            key: 'Size',
            label: 'Size',
            children:
                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap'
                    }}
                >
                    {dataDetail && Array.isArray(dataDetail.size) && dataDetail.size.map((item: any, index: any) => {
                        return (
                            <div key={`-${index}`}>
                                {item}
                            </div>
                        )
                    })}
                </div>,
            span: 2
        },
        {
            key: 'Quantity',
            label: 'Quantity',
            children: dataDetail.quantity,
            span: 2
        },
        {
            key: 'Sold',
            label: 'Sold',
            children: dataDetail.sold,
            span: 2
        },
        {
            key: 'Type',
            label: 'Type',
            children: dataDetail.type,
            span: 2
        },
        {
            key: 'Style',
            label: 'Style',
            children: dataDetail.style,
            span: 4
        },
        {
            key: 'createdAt',
            label: 'createdAt',
            children: moment(dataDetail.createdAt).format("DD-MM-YYYY hh:mm:ss"),
            span: 4,
        },
        {
            key: 'updatedAt',
            label: 'updatedAt',
            children: moment(dataDetail.updatedAt).format("DD-MM-YYYY hh:mm:ss"),
            span: 4
        },
    ];

    if (dataDetail && Array.isArray(dataDetail.colors) && dataDetail.colors.length > 0) {
        dataDetail.colors.map((item: any, index: any) => {
            const imageList = item?.image?.map((item: any, index: any) => {
                return (
                    {
                        uid: `-${index}`,
                        name: `${item}`,
                        url: `${import.meta.env.VITE_BACKEND_URL}/images/products/${item}`,
                    }
                )
            })

            items.push({
                key: `${index}`,
                label: `Images for ${item.colorName} color `,
                children: <div>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={imageList}
                        onPreview={handlePreview}
                        showUploadList={{ showRemoveIcon: false }}
                    // onChange={handleChange}
                    >
                        {/* {fileList.length >= 8 ? null : uploadButton} */}
                    </Upload>
                </div>,
                span: 4
            },)
        })
    }



    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    useEffect(() => {
        setFileList(dataDetail?.colors?.map((item: any, index: any) => {
            return (
                {
                    uid: `-${index}`,
                    name: `${item.image}`,
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/products/${item.image}`,
                }
            )
        }))
    }, [dataDetail])
    return (
        <>
            <Drawer
                closable
                destroyOnClose
                title={<p>View Detail Product</p>}
                placement="right"
                open={openDetail}
                loading={loadingDetail}
                onClose={() => setOpenDetail(false)}
                width={'40vw'}
            >
                <Descriptions title="Product Info" bordered items={items} />
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
            </Drawer>
        </>
    )
}

export default ProductDetail
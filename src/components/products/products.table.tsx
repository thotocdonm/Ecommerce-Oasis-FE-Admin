
import React, { useEffect, useState } from 'react';
import { Button, ColorPicker, Input, Popconfirm, Table, message } from 'antd';
import type { PopconfirmProps, TableColumnsType, TableProps } from 'antd';
import { deleteAProduct, deleteUser, fetchProductsWithPaginate, fetchUserWithPaginate } from '../../api/api';
import { useSearchParams } from 'react-router-dom';
import { ClearOutlined, DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import ProductDetail from './product.detail';
import ProductAddNewModal from './product.add.modal';
import ProductUpdateModal from './product.update.modal';

interface DataType {
    _id: string;
    name: string;
    price: number
    colors: IColor[];
    size: string[];
}

interface IColor {

    "colorName": string,
    "colorCode": string,
    "image": string[]

}




const ProductTable = () => {
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    const [productsData, setProductsData] = useState<IProductsData[]>([])
    const [openDetail, setOpenDetail] = React.useState<boolean>(false);
    const [loadingDetail, setLoadingDetail] = React.useState<boolean>(false);
    const [dataDetail, setDataDetail] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})
    const [searchQuery, setSearchQuery] = useState<string>();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

    const confirm = async (id: string) => {
        const res: IBackendRes<any> = await deleteAProduct(id);
        if (res && res.data) {
            message.success('Delete product success')
            fetchProduct();
            return
        }
        else {
            message.error(res.error)
        }

    };


    const columns: TableColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (value, record, index) => {
                return (
                    <>
                        <a href="#" onClick={() => {
                            setDataDetail(record)
                            setOpenDetail(true)
                        }} >{record._id}</a>
                    </>
                )

            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (value, record, index) => {
                return (
                    <>
                        {value}$
                    </>
                )
            },
        },
        {
            title: 'Available Colors',
            dataIndex: 'colors',
            render: (value, record, index) => {
                return (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexDirection: 'row'
                    }}>
                        {record.colors?.map((item, index) => {
                            return (
                                <div key={`${item.colorCode} - ${index}`}
                                >
                                    <ColorPicker defaultValue={`${item.colorCode}`} disabled />
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            title: 'Available Size',
            dataIndex: 'size',
            render: (value, record, index) => {
                return (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }} >
                        {record.size?.map((item) => {
                            return (
                                <div key={`${item} - ${index}`}>
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            title: 'Actions',
            render: (value, record, index) => {
                return (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <EditOutlined
                            style={{ fontSize: '20px', color: 'orange', cursor: 'pointer' }}
                            onClick={() => {
                                setIsUpdateModalOpen(true)
                                setDataUpdate(record)
                            }}
                        />
                        <Popconfirm
                            title="Delete a product"
                            description={`Are you sure to delete product : ${record.name}`}
                            onConfirm={() => confirm(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }} />
                        </Popconfirm>

                    </div>
                )
            },
        },
    ];


    const fetchProduct = async () => {
        let query = `current=${current}&pageSize=${pageSize}`
        if (searchQuery) {
            query += `&name=/${searchQuery}/i`
        }
        let res: IBackendRes<IBackendResPaginate<IProductsData[]>> = await fetchProductsWithPaginate(query);
        if (res && res.data) {
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
            setProductsData(res.data.result)
        }

    }

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current!);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize!);
            setCurrent(1)
        }
    };

    const showDetail = () => {
        setOpenDetail(true);
        setLoadingDetail(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoadingDetail(false);
        }, 2000);
    };

    const renderHeader = () => {
        return (
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    Table Products
                </div>
                <div style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                    <Search
                        enterButton={<SearchOutlined />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <Button
                        type='default'
                        onClick={() => { setSearchQuery('') }}
                    >
                        <ClearOutlined />
                    </Button>

                    <Button
                        type='primary'
                        onClick={() => setIsAddNewModalOpen(true)}
                    >
                        <UserAddOutlined />Add New Product
                    </Button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchProduct();
    }, [current, pageSize, searchQuery])
    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={productsData}
                    onChange={onChange}
                    title={renderHeader}
                    pagination={{
                        total: total,
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: [10, 20, 30],
                        showTotal: (total, range) => {
                            return (
                                <span>{range[0]} - {range[1]} of {total}</span>
                            )
                        }
                    }}

                />
            </div>
            <ProductDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                loadingDetail={loadingDetail}
                setLoadingDetail={setLoadingDetail}
                dataDetail={dataDetail!}
            />
            <ProductAddNewModal
                isAddNewModalOpen={isAddNewModalOpen}
                setIsAddNewModalOpen={setIsAddNewModalOpen}
                fetchProduct={fetchProduct}
            />
            <ProductUpdateModal
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                fetchProduct={fetchProduct}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    )
}

export default ProductTable
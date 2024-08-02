
import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Rate, Table, message } from 'antd';
import type { PopconfirmProps, TableColumnsType, TableProps } from 'antd';
import { deleteAReview, deleteUser, fetchOrdersWithPaginate, fetchReviewsWithPaginate, fetchUserWithPaginate, finishAOrder } from '../../api/api';
import { useSearchParams } from 'react-router-dom';
import { CheckOutlined, ClearOutlined, DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

interface DataType {
    _id: string
    name: string
    address: string
    phone: string
    price: number
    status: string
    detail: any
    createdAt: string
}





const OrderTable = () => {
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    const [ordersData, setOrdersData] = useState<IOrdersData[]>([])
    const [openDetail, setOpenDetail] = React.useState<boolean>(false);
    const [loadingDetail, setLoadingDetail] = React.useState<boolean>(true);
    const [dataDetail, setDataDetail] = useState({})
    const [searchQuery, setSearchQuery] = useState<string>();

    const confirm = async (id: string) => {
        const res: IBackendRes<any> = await finishAOrder(id);
        if (res && res.data) {
            message.success('Finish order success')
            fetchOrder();
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
                        <a href="#">{record._id}</a>
                    </>
                )

            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
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
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            render: (value, record, index) => {
                return (
                    <>
                        <JsonView collapsed={true} src={value} />
                    </>
                )
            },
        },

        {
            title: 'Actions',
            render: (value, record, index) => {
                return (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Popconfirm
                            title="Finish a order"
                            description={`Are you sure to finish this order : ${record._id}`}
                            onConfirm={() => confirm(record._id)}
                            okText="Yes"
                            cancelText="No"
                            disabled={record.status === "DONE" ? true : false}
                        >
                            <CheckOutlined style={{ fontSize: '20px', color: 'green', cursor: 'pointer' }} />
                        </Popconfirm>

                    </div>
                )
            },
        },
    ];


    const fetchOrder = async () => {
        let query = `current=${current}&pageSize=${pageSize}&populate=user&fields=user._id,user.name,user.email`
        if (searchQuery) {
            query += `&name=/${searchQuery}/i`
        }
        let res: IBackendRes<IBackendResPaginate<IOrdersData[]>> = await fetchOrdersWithPaginate(query);
        if (res && res.data) {
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
            setOrdersData(res.data.result)
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
                    Table Orders
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
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchOrder();
    }, [current, pageSize, searchQuery])
    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={ordersData}
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
        </>
    )
}

export default OrderTable
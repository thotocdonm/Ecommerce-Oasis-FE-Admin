
import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Rate, Table, message } from 'antd';
import type { PopconfirmProps, TableColumnsType, TableProps } from 'antd';
import { deleteAReview, deleteUser, fetchReviewsWithPaginate, fetchUserWithPaginate } from '../../api/api';
import { useSearchParams } from 'react-router-dom';
import { ClearOutlined, DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';

interface DataType {
    _id: string;
    rating: number;
    content: string
}





const ReviewTable = () => {
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    const [reviewsData, setReviewsData] = useState<IReviewsData[]>([])
    const [openDetail, setOpenDetail] = React.useState<boolean>(false);
    const [loadingDetail, setLoadingDetail] = React.useState<boolean>(true);
    const [dataDetail, setDataDetail] = useState({})
    const [searchQuery, setSearchQuery] = useState<string>();

    const confirm = async (id: string) => {
        const res: IBackendRes<any> = await deleteAReview(id);
        if (res && res.data) {
            message.success('Delete review success')
            fetchReview();
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
                            showDetail()
                            setDataDetail(record)
                        }}>{record._id}</a>
                    </>
                )

            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            render: (value, record, index) => {
                return (
                    <>
                        <Rate value={value} disabled />
                    </>
                )

            },
        },
        {
            title: 'Content',
            dataIndex: 'content',
        },
        {
            title: 'For Product',
            dataIndex: 'product',
            render: (value, record, index) => {
                return (
                    <>
                        {value.map((item: any) => {
                            return item.name
                        })}
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
                            title="Delete a review"
                            description={`Are you sure to delete review : ${record._id}`}
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


    const fetchReview = async () => {
        let query = `current=${current}&pageSize=${pageSize}&populate=product&fields=product._id,product.name`
        if (searchQuery) {
            query += `&content=/${searchQuery}/i`
        }
        let res: IBackendRes<IBackendResPaginate<IReviewsData[]>> = await fetchReviewsWithPaginate(query);
        if (res && res.data) {
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
            setReviewsData(res.data.result)
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

    console.log(reviewsData)
    const renderHeader = () => {
        return (
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    Table Reviews
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
        fetchReview();
    }, [current, pageSize, searchQuery])
    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={reviewsData}
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

export default ReviewTable
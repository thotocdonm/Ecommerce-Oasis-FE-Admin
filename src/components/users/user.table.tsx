
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { fetchUserWithPaginate } from '../../api/api';
import { useSearchParams } from 'react-router-dom';
import UserDetail from './user.detail';

interface DataType {
    _id: string;
    name: string;
    email: string
    role: string;
    address: string;
}





const UserTable = () => {
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3);
    const [total, setTotal] = useState<number>(0);
    const [usersData, setUsersData] = useState<IUsersData[]>([])
    const [openDetail, setOpenDetail] = React.useState<boolean>(false);
    const [loadingDetail, setLoadingDetail] = React.useState<boolean>(true);
    const [dataDetail, setDataDetail] = useState({})

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
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
    ];


    const fetchUser = async () => {
        let query = `current=${current}&pageSize=${pageSize}`
        let res: IBackendRes<IBackendResFetchUserWithPaginate> = await fetchUserWithPaginate(query);
        if (res && res.data) {
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
            setUsersData(res.data.result)
        }
        console.log(res)
    }

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
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

    useEffect(() => {
        fetchUser();
    }, [current, pageSize])
    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={usersData}
                    onChange={onChange}
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
            <UserDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                loadingDetail={loadingDetail}
                setLoadingDetail={setLoadingDetail}
                dataDetail={dataDetail!}
            />
        </>
    )
}

export default UserTable
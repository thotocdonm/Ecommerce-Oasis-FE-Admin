
import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Table, message } from 'antd';
import type { PopconfirmProps, TableColumnsType, TableProps } from 'antd';
import { deleteUser, fetchUserWithPaginate } from '../../api/api';
import { useSearchParams } from 'react-router-dom';
import UserDetail from './user.detail';
import { ClearOutlined, DeleteOutlined, EditOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import UserUpdateModal from './user.update.modal';
import UserAddNewModal from './user.add.modal';
import Search from 'antd/es/input/Search';

interface DataType {
    _id: string;
    name: string;
    email: string
    role: string;
    address: string;
}





const UserTable = () => {
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    const [usersData, setUsersData] = useState<IUsersData[]>([])
    const [openDetail, setOpenDetail] = React.useState<boolean>(false);
    const [loadingDetail, setLoadingDetail] = React.useState<boolean>(true);
    const [dataDetail, setDataDetail] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})
    const [searchQuery, setSearchQuery] = useState<string>();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

    const confirm = async (id: string) => {
        const res: IBackendRes<any> = await deleteUser(id);
        if (res && res.data) {
            message.success('Delete user success')
            fetchUser();
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
                            title="Delete a user"
                            description={`Are you sure to delete user : ${record.email}`}
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


    const fetchUser = async () => {
        let query = `current=${current}&pageSize=${pageSize}`
        if (searchQuery) {
            query += `&name=/${searchQuery}/i`
        }
        let res: IBackendRes<IBackendResFetchUserWithPaginate> = await fetchUserWithPaginate(query);
        if (res && res.data) {
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
            setUsersData(res.data.result)
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
                    Table Users
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
                        <UserAddOutlined />Add New User
                    </Button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchUser();
    }, [current, pageSize, searchQuery])
    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={usersData}
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
            <UserDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                loadingDetail={loadingDetail}
                setLoadingDetail={setLoadingDetail}
                dataDetail={dataDetail!}
            />
            <UserUpdateModal
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchUser={fetchUser}
            />
            <UserAddNewModal
                isAddNewModalOpen={isAddNewModalOpen}
                setIsAddNewModalOpen={setIsAddNewModalOpen}
                fetchUser={fetchUser}
            />
        </>
    )
}

export default UserTable
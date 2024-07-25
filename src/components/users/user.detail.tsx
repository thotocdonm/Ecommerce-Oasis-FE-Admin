import React, { Dispatch, SetStateAction } from 'react';
import { Button, Drawer } from 'antd';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import moment from 'moment';

interface IProps {
    openDetail: boolean,
    setOpenDetail: Dispatch<SetStateAction<boolean>>,
    loadingDetail: boolean,
    setLoadingDetail: Dispatch<SetStateAction<boolean>>,
    dataDetail: any

}



const UserDetail = (props: IProps) => {
    const { openDetail, setOpenDetail, loadingDetail, setLoadingDetail, dataDetail } = props;

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
            key: 'Email',
            label: 'Email',
            children: dataDetail.email,
            span: 2
        },
        {
            key: '4',
            label: 'Role',
            children: dataDetail.role,
            span: 2
        },
        {
            key: 'Address',
            label: 'Address',
            children: dataDetail.address,
            span: 2
        },
        {
            key: 'createdAt',
            label: 'createdAt',
            children: moment(dataDetail.createdAt).format("DD-MM-YYYY hh:mm:ss"),
            span: 3,
        },
        {
            key: 'updatedAt',
            label: 'updatedAt',
            children: moment(dataDetail.updatedAt).format("DD-MM-YYYY hh:mm:ss"),
            span: 3
        },
    ];
    return (
        <>
            <Drawer
                closable
                destroyOnClose
                title={<p>View Detail User</p>}
                placement="right"
                open={openDetail}
                loading={loadingDetail}
                onClose={() => setOpenDetail(false)}
                width={'40vw'}
            >
                <Descriptions title="User Info" bordered items={items} />;
            </Drawer>
        </>
    )
}

export default UserDetail
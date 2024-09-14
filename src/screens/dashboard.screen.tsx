import { ArrowUpOutlined } from "@ant-design/icons"
import { Card, Statistic } from "antd"
import { useEffect, useState } from "react"
import { getTotalOrders, getTotalPrice } from "../api/api";



const DashboardPage = () => {

    const [totalNumber, setTotalNumber] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const res1 = await getTotalOrders();
        if (res1 && res1.data) {
            setTotalNumber(res1.data)
        }
        const res2 = await getTotalPrice();
        if (res2 && res2.data) {
            setTotalRevenue(res2.data)
        }
    }

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Card title="Total number of Orders" style={{ width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Statistic
                    value={totalNumber}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                />
            </Card>

            <Card title="Total revenue" style={{ width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Statistic
                    value={totalRevenue}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix={"$"}
                />
            </Card>
        </div>
    )
}

export default DashboardPage
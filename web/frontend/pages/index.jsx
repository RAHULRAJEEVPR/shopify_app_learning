import { Layout, LegacyCard, Page } from "@shopify/polaris";
import { Card, OrderDetails, OrderGraphs } from "../components";
import { useAuthenticatedFetch } from '../hooks'
import { useEffect, useState } from "react";

export default function HomePage() {
  const [count,setCount]= useState(0)
  const [fulfilledOrder,setFulfilledOrder]= useState(0)
  const [remainsOrders,setRemainsOrders]= useState(0)
  const [totalOrderCount,setTotalOrderCount]= useState(0)
  const [orders,setOrdres]= useState(0)
  let fetch = useAuthenticatedFetch()
  useEffect(() => {
    const fetchStoreInfo = async () => {
        try {
          console.log("myreee");
            let response = await fetch("/api/products/count")
            let data = await response.json()
            console.log(data)
         setCount(data.count)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchOrders = async () => {
        try {
          console.log("myreee");
            let response = await fetch("/api/orders/all")
            let data = await response.json()
            console.log(data,"orders")
            setTotalOrderCount(data.data.length)
            let fulfilledOrders=data.data?.filter(item=>item.fulfillment_status==="fulfilled")
            setFulfilledOrder(fulfilledOrders.length)
            setRemainsOrders(data.data.length-fulfilledOrders.length)
          } catch (error) {
            console.log(error)
        }
    }

    fetchStoreInfo()
    fetchOrders()
}, []) 
  return (
    <Page fullWidth>
      <div className="home-section">
        <div className="graph-section">
         <OrderGraphs/>
        </div>
        <div className="cards-section">
          <Layout>
            <Card title="Total Order" data={totalOrderCount} totalOrderCard/>
            <Card title="Fulfilled order" data={fulfilledOrder} fulfilledOrderCard />
            <Card title="Remains Orders" data={remainsOrders} remainsCard/>
            <Card title="Total Products" data={count} productCard/>
            <Card title="Total Collections"/>
          
          </Layout>
        </div>
        <div className="order-details-section">
          <OrderDetails/>
        </div>
      </div>
    </Page>
  );
}

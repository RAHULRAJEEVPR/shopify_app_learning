import { Layout, LegacyCard } from '@shopify/polaris'
import React, { useState } from 'react'
import { storeData } from '../data'
import {Chart as ChartJS} from "chart.js/auto"
import {Line,Bar,Doughnut} from"react-chartjs-2"
export  function OrderGraphs() {
    let [data, setData] = useState({
        labels: storeData.map((d) => d.year),
        datasets: [{
            label: "Total Orders",
            data: storeData.map((d) => d.order),
            backgroundColor: ['#008170', '#000000', '#8e8e8e', '#81BF37']
        }]
    });
  
        return (
    < >
         <Layout>
            <Layout.Section oneHalf>
              <LegacyCard title="Total Order" sectioned>
                <Line data={data} options={{responsive:true,maintainAspectRatio:false}} />
              </LegacyCard>
            </Layout.Section>
            <Layout.Section oneThird>
              {" "}
              <LegacyCard title="completd orders" sectioned>
                <Doughnut data={data} options={{responsive:true,maintainAspectRatio:false}}/>
              </LegacyCard>
            </Layout.Section>
            <Layout.Section oneThird>
              {" "}
              <LegacyCard title="Remaining orders" sectioned>
              <Bar data={data} options={{responsive:true,maintainAspectRatio:false}}/>
              </LegacyCard>
            </Layout.Section>
          </Layout>
    </>
  )
}

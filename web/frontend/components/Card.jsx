import { Layout, LegacyCard } from '@shopify/polaris'
import React from 'react'

export function Card({title,data,productCard,totalOrderCard,fulfilledOrderCard,remainsCard}) {
  return (
    <>
        <Layout.Section oneThird>
            <LegacyCard title={title} sectioned>
                <h2>{productCard&&data}</h2>
                <h2>{totalOrderCard&&data}</h2>
                <h2>{fulfilledOrderCard&&data}</h2>
                <h2>{remainsCard&&data}</h2>
                
            </LegacyCard>
        </Layout.Section>
    </>
  )
}
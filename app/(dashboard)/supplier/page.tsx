import React from 'react'
import SupplieroverViewCard from './_components/supplieroverViewCard'
import DynamicDashboard from './_components/supplierChart'

const page = () => {
  return (
    <div>
  <SupplieroverViewCard/>
  <DynamicDashboard/>
    </div>
  )
}

export default page
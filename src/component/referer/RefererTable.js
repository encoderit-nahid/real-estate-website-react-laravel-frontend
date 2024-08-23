import React from 'react'
import BaseDataTable from '../reuseable/baseDataTable/BaseDataTable'
import { Box } from '@mui/material'
import { useGetRefererQuery } from '@/queries/useGetRefererQuery'

function RefererTable() {
  const {data: refererData} = useGetRefererQuery()
  console.log({refererData})
  return (
    <Box>
          <BaseDataTable
                    headers={[
                      "Nominated people",
                      "Amount",
                      "Amount received",
                      "Balance receivable",
                      "Nominees",
                    ]}
                  />
    </Box>
  )
}

export default RefererTable
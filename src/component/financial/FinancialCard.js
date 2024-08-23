import { Box, Grid } from '@mui/material'
import React from 'react'
import FinancialElement from './FinancialElement'
import { useGetFinancialQuery } from '@/queries/useGetFinancialQuery'

function FinancialCard({ language }) {
  const { data: financialData } = useGetFinancialQuery()
  return (
    <Box>
    <Grid container spacing={3}>
      {financialData?.map((data) => (
       <Grid key={data?.id} item xs={12} lg={6} xl={4}>
         <FinancialElement   language={language} />
        </Grid>
      ))}
      </Grid>
    </Box>
  )
}

export default FinancialCard

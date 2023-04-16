import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import submitProposal from '../../../public/Images/submit_proposal.png'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import BaseTextField from '../reuseable/baseTextField/BaseTextField'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(/.+@.+\.[A-Za-z]+$/, 'Email is invalid'),
})

function ForgotPasswordModal({ handleClose }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // top:{xs:"80%"},
    transform: 'translate(-50%, -50%)',
    width: { xs: '80%', sm: '80%', md: '60%', lg: '35%', xl: '35%' },
    bgcolor: '#ffffff',
    // border: "2px solid #000",
    boxShadow: 'none',
    borderRadius: '12px',
    maxHeight: '70vh',
    overflowY: 'scroll',
    px: 3,
    py: 2,
  }

  const {
    register,
    watch,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    console.log({ data })
  }
  return (
    <Box sx={style}>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Image src={submitProposal} alt="submit" />
          </Box>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="p"
            sx={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1A1859',
              lineHeight: '32px',
            }}
          >
            Forgot your password ?
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mt: 3, mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: '#253858',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '16px',
              }}
            >
              Email<span style={{ color: '#E63333' }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <BaseTextField
                size={'small'}
                placeholder={'Email'}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
                name={'email'}
                // error={errors.email ? true : false}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: '#b91c1c' }}
          >
            {errors.email?.message}
          </Typography>

          <Button
            // onClick={handleClose}
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              py: 1,
              background: '#DBE1E5',
              color: '#1A1859',
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '22px',
              textTransform: 'none',
            }}
            // onClick={handleProposalClose}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default ForgotPasswordModal

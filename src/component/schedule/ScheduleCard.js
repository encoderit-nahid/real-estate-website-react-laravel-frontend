import React from 'react'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { Button, CircularProgress, Container, Grid } from '@mui/material'
import { useState } from 'react'

// import rentImage from "../public/Images/rentCard.png";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { cancelSchedule } from '../../redux/schedules/actions'
import { _baseURL } from '../../../consts'

function ScheduleCard({ data }) {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const handleCancelSchedule = (id) => {
		setLoading(true)
		const data = {
			schedule_id: id,
		}
		dispatch(cancelSchedule(data))
		setLoading(false)
	}

	const myLoader = ({ src }) => {
		return `${_baseURL}/storage/${src}`
	}

	return (
		<Container maxWidth="xl" sx={{ marginTop: 5 }}>
			<Box
				sx={{
					width: '100%',
					background: '#ffffff',
					borderRadius: '6px',
					pr: 2,
				}}
			>
				<Grid
					container
					spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2, xxl: 2 }}
				>
					<Grid item xs={12} sm={12} md={12} lg={4} className="rentImage">
						<Box>
							<Image
								loader={myLoader}
								src={`${data?.property?.attachments?.[0]?.file_path}`}
								height={220}
								width={300}
								alt="rentImage"
							/>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={8}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={12} md={12} lg={4}>
								<Grid
									container
									direction="column"
									justifyContent="flex-start"
									alignItems="flex-start"
									sx={{
										px: { xs: 2, sm: 2, md: 2, lg: 0 },
										py: { xs: 2, sm: 2, md: 2, lg: 0 },
									}}
								>
									<Typography
										variant="h6"
										sx={{
											color: '#002152',
											fontWeight: '700',
											fontSize: {
												xs: '16px',
												sm: '16px',
												md: '16px',
												lg: '12px',
												xl: '16px',
											},
											lineHeight: '22px',
										}}
									>
										property details
									</Typography>
									<Typography
										variant="h6"
										sx={{
											color: '#002152',
											fontWeight: '700',
											fontSize: {
												xs: '24px',
												sm: '24px',
												md: '24px',
												lg: '14px',
												xl: '24px',
											},
											lineHeight: '32px',
										}}
									>
										{`BRL ${data?.property?.brl_rent}`}
									</Typography>
									<Typography
										variant="h6"
										sx={{
											color: '#6C7A84',
											fontWeight: '400',
											fontSize: {
												xs: '16px',
												sm: '16px',
												md: '16px',
												lg: '12px',
												xl: '16px',
											},
											lineHeight: '22px',
										}}
									>
										{data?.property?.address?.address}
									</Typography>
									<Typography
										variant="h6"
										sx={{
											color: '#6C7A84',
											fontWeight: '400',
											fontSize: {
												xs: '16px',
												sm: '16px',
												md: '16px',
												lg: '12px',
												xl: '16px',
											},
											lineHeight: '22px',
										}}
									>
										{` created on: ${dayjs(
											data?.property?.created_at
										).format('MM/DD/YYYY')}
                      `}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={4}>
								<Grid
									container
									direction="column"
									justifyContent="flex-start"
									alignItems="flex-start"
									sx={{
										px: { xs: 2, sm: 2, md: 2, lg: 0 },
										py: { xs: 2, sm: 2, md: 2, lg: 0 },
									}}
								>
									<Typography
										variant="h6"
										sx={{
											color: '#002152',
											fontWeight: '700',
											fontSize: {
												xs: '16px',
												sm: '16px',
												md: '16px',
												lg: '12px',
												xl: '16px',
											},
											lineHeight: '22px',
											pl: 0.5,
										}}
									>
										visitor data
									</Typography>
									<Button
										sx={{
											display: 'flex',
											padding: 0,
											textTransform: 'none',
											mt: 1,
											'&:hover': {
												background: 'transparent',
											},
										}}
									>
										<PermIdentityOutlinedIcon
											sx={{ color: '#6C7A84' }}
										/>
										<Typography
											variant="h6"
											sx={{
												color: '#6C7A84',
												fontWeight: '400',
												fontSize: {
													xs: '16px',
													sm: '16px',
													md: '16px',
													lg: '12px',
													xl: '16px',
												},
												lineHeight: '22px',
											}}
										>
											{data?.buyer?.name}
										</Typography>
									</Button>
									<Button
										sx={{
											display: 'flex',
											padding: 0,
											textTransform: 'none',
											mt: 1,
											'&:hover': {
												background: 'transparent',
											},
										}}
									>
										<EmailOutlinedIcon sx={{ color: '#6C7A84' }} />
										<Typography
											variant="h6"
											sx={{
												color: '#6C7A84',
												fontWeight: '400',
												fontSize: {
													xs: '16px',
													sm: '16px',
													md: '16px',
													lg: '12px',
													xl: '16px',
												},
												lineHeight: '22px',
											}}
										>
											{data?.buyer?.email}
										</Typography>
									</Button>
									<Button
										sx={{
											display: 'flex',
											padding: 0,
											textTransform: 'none',
											mt: 1,
											'&:hover': {
												background: 'transparent',
											},
										}}
									>
										<PhoneEnabledOutlinedIcon
											sx={{ color: '#6C7A84' }}
										/>
										<Typography
											variant="h6"
											sx={{
												color: '#6C7A84',
												fontWeight: '400',
												fontSize: {
													xs: '16px',
													sm: '16px',
													md: '16px',
													lg: '12px',
													xl: '16px',
												},
												lineHeight: '22px',
											}}
										>
											{data?.buyer?.phone}
										</Typography>
									</Button>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={4}>
								<Grid
									container
									direction="column"
									justifyContent="flex-start"
									alignItems="flex-start"
									sx={{
										px: { xs: 2, sm: 2, md: 2, lg: 0 },
										py: { xs: 2, sm: 2, md: 2, lg: 0 },
									}}
								>
									<Typography
										variant="h6"
										sx={{
											color: '#002152',
											fontWeight: '700',
											fontSize: {
												xs: '16px',
												sm: '16px',
												md: '16px',
												lg: '12px',
												xl: '16px',
											},
											lineHeight: '22px',
										}}
									>
										visit data
									</Typography>

									<Typography
										variant="h6"
										sx={{
											color: '#6C7A84',
											fontWeight: '700',
											fontSize: {
												xs: '16px',
												sm: '16px',
												md: '16px',
												lg: '12px',
												xl: '16px',
											},
											lineHeight: '22px',
											mt: 1,
										}}
									>
										<span style={{ fontWeight: '400' }}>Date:</span>
										{` ${dayjs(data?.buyer?.created_at).format(
											'MM/DD/YYYY'
										)}
                      `}
									</Typography>
									<Typography
										variant="h6"
										sx={{
											color: '#6C7A84',
											fontWeight: '700',
											fontSize: {
												xs: '16px',
												sm: '16px',
												md: '16px',
												lg: '12px',
												xl: '16px',
											},
											lineHeight: '22px',
											mt: 1,
										}}
									>
										<span style={{ fontWeight: '400' }}>Time:</span>
										{` ${dayjs(data?.buyer?.created_at).format(
											'h:mm   '
										)}
                      `}
									</Typography>
									{data?.buyer?.observation && (
										<Typography
											variant="h6"
											sx={{
												color: '#6C7A84',
												fontWeight: '700',
												fontSize: {
													xs: '16px',
													sm: '16px',
													md: '16px',
													lg: '12px',
													xl: '16px',
												},
												lineHeight: '22px',
												mt: 1,
											}}
										>
											<span style={{ fontWeight: '400' }}>
												Observation:
											</span>
											{` ${data?.buyer?.observation}`}
										</Typography>
									)}
								</Grid>
							</Grid>
						</Grid>
						<Grid
							container
							direction="row"
							justifyContent="flex-end"
							alignItems="flex-end"
							gap={{
								xs: 0.5,
								sm: 0.5,
								md: 0.5,
								lg: 2,
								xl: 2,
								xxl: 2,
							}}
							sx={{ ml: { xs: 1, sm: 1, md: 1, lg: 0 } }}
						>
							<Button
								onClick={() => handleCancelSchedule(data?.id)}
								variant="outlined"
								sx={{
									borderColor: '#F44336',
									color: '#F44336',
									textTransform: 'none',
									fontSize: '16px',
									fontWeight: '600',
									lineHeight: '22px',
									mt: { xs: 3, sm: 3, md: 3, lg: 0, xl: 3 },
									mb: 1,
									'&:hover': {
										borderColor: '#F44336',
										color: '#F44336',
									},
								}}
							>
								{loading && (
									<CircularProgress size={22} color="inherit" />
								)}
								{!loading && 'Cancel visit'}
							</Button>
							{/* <Button
              variant="contained"
              sx={{
                textTransform: "none",
                mt: { xs: 3, sm: 3, md: 3, lg: 0, xl: 3 },
                mb: 1,

                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
              }}
            >
              Copy Information
            </Button> */}
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}

export default ScheduleCard

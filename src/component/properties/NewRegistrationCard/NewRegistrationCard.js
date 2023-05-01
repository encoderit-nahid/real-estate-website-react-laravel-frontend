import {
	Box,
	Button,
	CircularProgress,
	Grid,
	LinearProgress,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import rentImage from '../../../../public/Images/rentImage.png'
import Image from 'next/image'
import Link from 'next/link'
import { _baseURL } from '../../../../consts'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { ChangePropertyStatus } from '../../../redux/propertyStatus/actions'
import { findPropertyData } from '../../../redux/property/actions'

const omitEmpties = (obj) => {
	return Object.entries(obj).reduce((carry, [key, value]) => {
		if (![null, undefined, ''].includes(value)) {
			carry[key] = value
		}
		return carry
	}, {})
}

function NewRegistrationCard({ propertyData, newProperty }) {
	const [progress, setProgress] = React.useState(87)
	const dispatch = useDispatch()
	const [approveid, setApproveId] = useState('')
	const [rejectid, setRejectId] = useState('')

	const handleReject = (id) => {
		setRejectId(id)
		dispatch(ChangePropertyStatus({ property_id: id, status: 'rejected' }))
		// dispatch(findPropertyData({ status: "new", page: 1, per_page: 9 }));
	}

	const handleApprove = (id) => {
		setApproveId(id)
		dispatch(ChangePropertyStatus({ property_id: id, status: 'approved' }))
		// dispatch(findPropertyData({ status: "new", page: 1, per_page: 9 }));
	}

	const rejectLoading = useSelector(
		(state) => state?.propertyStatus?.rejectLoading
	)

	const approveLoading = useSelector(
		(state) => state?.propertyStatus?.approveLoading
	)

	const myLoader = ({ src }) => {
		return `${_baseURL}/storage/${src}`
	}

	return (
		<Box
			sx={{
				background: '#ffffff',
				boxShadow: '0px 4px 8px rgba(0, 33, 82, 0.08)',
				borderRadius: { xs: 0, sm: 0, md: 0, lg: '8px', xl: '8px' },
				mt: 1,
			}}
		>
			<Grid container spacing={2}>
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					lg={4}
					xl={4}
					className="rentImageCard"
				>
					{/* <Box>
            <Image src={rentImage} layout="responsive" alt="rent" />
          </Box> */}
					<Link
						href={`/property_view/${propertyData?.id}`}
						as={`/property_view/${propertyData?.id}`}
					>
						<Box
							style={{
								width: '100%',
								height: '100%',
								position: 'relative',
								cursor: 'pointer',
								//   display: { lg: "inline" },
							}}
						>
							<Image
								alt="rent"
								loader={myLoader}
								src={`${propertyData?.attachments[0]?.file_path}`}
								layout="fill"
								objectFit="cover"
								style={{ borderRadius: '8px 0 0 8px' }}
							/>
						</Box>
					</Link>
				</Grid>

				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					className="rentImageCard"
					sx={{
						display: {
							xs: 'inline',
							sm: 'inline',
							md: 'inline',
							lg: 'none',
						},
						ml: 2,
					}}
				>
					{/* <Box>
            <Image src={rentImage} layout="responsive" alt="rent" />
          </Box> */}
					<Box>
						<Image
							alt="rent"
							src={rentImage}
							width={400}
							//   style={{ borderRadius: "8px 0 0 8px" }}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
					<Grid
						container
						direction="column"
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ p: { xs: 2, sm: 2, md: 2, lg: 0 } }}
					>
						<Grid
							container
							direction="row"
							justifyContent="flex-start"
							alignItems="flex-start"
						>
							<Box>
								<Button
									sx={{
										textTransform: 'none',
										background: 'rgba(116, 80, 240, 0.2)',
										borderRadius: '2px',
										padding: '2px 8px',
										color: '#7450F0',
										fontSize: '14px',
										lineHeight: '18px',
										fontWeight: '400',
									}}
								>
									{propertyData?.ad_type}
								</Button>
								{propertyData?.status === 'approved' && (
									<Button
										sx={{
											textTransform: 'none',
											background: '#DDF8ED',
											borderRadius: '2px',
											padding: '2px 8px',
											color: '#229464',
											fontSize: '14px',
											lineHeight: '18px',
											fontWeight: '400',
											ml: '3px',
										}}
									>
										published
									</Button>
								)}
							</Box>
							<Box
								sx={{
									ml: { xs: 0, sm: 0, md: 0, lg: 1, xl: 3, xxl: 8 },
								}}
							>
								<Typography
									variant="p"
									sx={{
										fontSize: '14px',
										lineHeight: '18px',
										fontWeight: '400',
										color: '#9FAAB1',
									}}
								>
									{`${propertyData?.form_fill_up_progress}%`}
								</Typography>
							</Box>
							<Box sx={{ width: '20%', mr: 1, mt: '1.5vh', ml: 1 }}>
								<LinearProgress
									sx={{
										'& .MuiLinearProgress-barColorPrimary': {
											backgroundColor: '#34BE84',
											borderRadius: '10px',
										},
										backgroundColor: '#f5f5f5',
										borderRadius: '10px',
										// "& .MuiLinearProgress-colorPrimary": {
										//   backgroundColor: "#F5F5F5",
										// },
									}}
									variant="determinate"
									value={propertyData?.form_fill_up_progress}
								/>
							</Box>
						</Grid>
						<Typography
							variant="p"
							sx={{
								color: '#002152',
								fontSize: '24px',
								lineHeight: '32px',
								fontWeight: '700',
								mt: 1,
							}}
						>
							{`BRL ${propertyData?.brl_rent}`}
						</Typography>
						<Typography
							variant="p"
							sx={{
								color: ' #9FAAB1',
								fontSize: '16px',
								lineHeight: '24px',
								fontWeight: '400',
								mt: 1,
								mr: 0.5,
							}}
						>
							{propertyData?.address?.address}
						</Typography>
						<Typography
							variant="p"
							sx={{
								color: ' #9FAAB1',
								fontSize: '16px',
								lineHeight: '24px',
								fontWeight: '400',
								mt: 0.5,
							}}
						>
							{`created on: ${dayjs(propertyData?.created_at).format(
								'DD/MM/YYYY'
							)}`}
						</Typography>
						<Box
							sx={{ mt: 1, mb: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}
						>
							<Button
								onClick={() => handleReject(propertyData.id)}
								variant="outlined"
								sx={{
									borderColor: '#F44336',
									color: '#F44336',
									fontSize: '14px',
									lineHeight: '18px',
									fontWeight: '600',

									borderRadius: '4px',

									textTransform: 'none',
									'&:hover': {
										borderColor: '#F44336',
										color: '#F44336',
										fontSize: '14px',
										lineHeight: '18px',
										fontWeight: '600',

										borderRadius: '4px',

										textTransform: 'none',
									},
								}}
							>
								{rejectLoading && rejectid === propertyData.id ? (
									<CircularProgress size={22} color="inherit" />
								) : (
									'Reject'
								)}
							</Button>
							<Link
								href={{
									pathname: '/my_properties/new_property',
									query: omitEmpties({
										property_id: propertyData?.id,
									}),
								}}
							>
								<Button
									variant="contained"
									sx={{
										fontSize: '14px',
										lineHeight: '18px',
										fontWeight: '600',

										borderRadius: '4px',
										//   padding: "8px 20px",
										textTransform: 'none',
										ml: 1,
										mr: 1,
										'&:hover': {
											fontSize: '14px',
											lineHeight: '18px',
											fontWeight: '600',

											borderRadius: '4px',
											//   padding: "8px 20px",
											textTransform: 'none',
											ml: 1,
											mr: 1,
										},
									}}
								>
									Edit
								</Button>
							</Link>
							<Button
								onClick={() => handleApprove(propertyData.id)}
								variant="contained"
								color="success"
								sx={{
									fontSize: '14px',
									lineHeight: '18px',
									fontWeight: '600',

									borderRadius: '4px',
									//   padding: "8px 20px",
									textTransform: 'none',
									mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
									'&:hover': {
										fontSize: '14px',
										lineHeight: '18px',
										fontWeight: '600',

										borderRadius: '4px',
										//   padding: "8px 20px",
										textTransform: 'none',
										mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
									},
								}}
							>
								{approveLoading && approveid === propertyData.id ? (
									<CircularProgress size={22} color="inherit" />
								) : (
									'Approve'
								)}
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

export default NewRegistrationCard

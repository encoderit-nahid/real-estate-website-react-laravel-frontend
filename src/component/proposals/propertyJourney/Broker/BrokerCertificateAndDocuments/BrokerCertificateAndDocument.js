import {
	Box,
	Button,
	Grid,
	Typography,
	Tooltip,
	LinearProgress,
	CircularProgress,
	Skeleton,
} from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import certificate from '../../../../../../public/Images/certificate.png'
import maskedIcon from '../../../../../../public/Images/maskedIcon.png'
import content from '../../../../../../public/Images/content.png'

import BaseModal from '../../../../reuseable/baseModal/BaseModal'

import SaleCard from '../../../../reuseable/saleCard/SaleCard'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'

import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useDispatch, useSelector } from 'react-redux'
import { findCertificateData } from '../../../../../redux/certificates/actions'
import { certificateSubmitApi } from '../../../../../api'

function BrokerCertificateAndDocument({ handleNext, singlePropertyData }) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(findCertificateData('certificate'))
	}, [dispatch])
	const [loading, setLoading] = useState(false)
	const [certificateTypes, setCertificateTypes] = useState([])
	const allCertificateData = useSelector(
		(state) => state?.certificate?.certificateData
	)

	const Loading = useSelector((state) => state?.certificate?.loading)

	const handleRequestSubmit = async () => {
		if (certificateTypes.length > 0) {
			setLoading(true)
			const requireData = {
				contract_id: +singlePropertyData?.contract?.id,
				certificates_id: certificateTypes,
			}
			const [error, response] = await certificateSubmitApi(requireData)
			setLoading(false)
			if (!error) {
				handleNext()
			} else {
				const errors = error?.response?.data?.errors ?? {}
			}
		}
	}
	return (
		<Box sx={{ mt: 4 }}>
			<Grid
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start"
			>
				<Image height={40} width={60} src={certificate} alt="handshake" />
				<Typography
					variant="p"
					sx={{
						color: '#002152',
						fontSize: '24px',
						fontWeight: '700',
						lineHeight: '32px',
						ml: 1,
					}}
				>
					Certificates and documents
				</Typography>
			</Grid>
			<Box sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 4 } }}>
				<Grid container spacing={2}>
					{Loading ? (
						<Grid item xs={12} sm={12} md={12} lg={3}>
							<Skeleton
								variant="rect"
								height={230}
								sx={{ mx: 2, my: 2, borderRadius: '8px' }}
							/>
						</Grid>
					) : (
						<Grid item xs={12} sm={12} md={12} lg={3}>
							<SaleCard singlePropertyData={singlePropertyData} />
						</Grid>
					)}
					<Grid item xs={12} sm={12} md={12} lg={8}>
						<Grid
							container
							direction="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography
								variant="p"
								sx={{
									color: '#1A1859',
									fontSize: '16px',
									lineHeight: '22px',
									fontWeight: '700',
								}}
							>
								Select the required documents
							</Typography>
							<FormControl component="fieldset">
								<FormControlLabel
									value="end"
									control={<Checkbox sx={{ color: '#002152' }} />}
									onChange={(e) => {
										if (e.target.checked === true) {
											const allIdArray = allCertificateData?.map(
												(data) => data?.id
											)
											setCertificateTypes(allIdArray)
										} else {
											setCertificateTypes([])
										}
									}}
									label={
										<Typography
											variant="h6"
											style={{
												color: '#002152',
												fontSize: '14px',
												fontWeight: '400',
												lineHeight: '18px',
											}}
										>
											Select all
										</Typography>
									}
									labelPlacement="end"
								/>
							</FormControl>
						</Grid>
						<Grid container spacing={3}>
							{Loading
								? [0, 1, 2].map((data, index) => (
										<Grid
											key={index}
											item
											xs={12}
											sm={12}
											md={12}
											lg={6}
											xl={6}
											xxl={6}
										>
											<Skeleton
												variant="rect"
												height={150}
												width={300}
												sx={{ mx: 2, my: 2, borderRadius: '8px' }}
											/>
										</Grid>
								  ))
								: allCertificateData?.map((data, index) => (
										<Grid
											key={data?.id}
											item
											xs={12}
											sm={12}
											md={12}
											lg={6}
											sx={{ mt: 1 }}
										>
											<Box
												onClick={() => {
													if (
														!certificateTypes?.includes(data.id)
													) {
														setCertificateTypes((current) => [
															...current,
															data.id,
														])
													} else {
														const newArray = certificateTypes?.filter(
															(value) => value !== data.id
														)
														setCertificateTypes(newArray)
													}
												}}
												sx={{
													background: `${
														certificateTypes?.includes(data.id)
															? '#0362F0'
															: '#F2F5F6'
													}`,
													color: `${
														certificateTypes?.includes(data.id)
															? '#ffffff'
															: '#32414C'
													}`,
													borderRadius: '8px',
													py: 2,
													px: 2,
													height: 120,
												}}
											>
												<Grid
													container
													direction="column"
													justifyContent="center"
													alignItems="center"
												>
													<Box>
														<Typography
															variant="p"
															sx={{
																color: `${
																	certificateTypes?.includes(
																		data.id
																	)
																		? '#ffffff'
																		: '#32414C'
																}`,
																fontSize: '14px',
																lineHeight: '18px',
																fontWeight: '400',
															}}
														>
															{data?.name}
														</Typography>
													</Box>
												</Grid>
											</Box>
										</Grid>
								  ))}
						</Grid>
						<Grid
							container
							direction="row"
							justifyContent="flex-end"
							alignItems="flex-start"
						>
							<Button
								onClick={handleRequestSubmit}
								sx={{
									background: '#34BE84',
									color: '#ffffff',
									fontSize: '16px',
									lineHeight: '22px',
									textTransform: 'none',
									mt: 5,
									px: 2,
									'&: hover': {
										background: '#34BE84',
										color: '#ffffff',
										fontSize: '16px',
										lineHeight: '22px',
										px: 2,
									},
								}}
							>
								{loading && (
									<CircularProgress size={22} color="inherit" />
								)}
								{!loading && 'Request documents'}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}

export default BrokerCertificateAndDocument

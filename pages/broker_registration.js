import Navbar from '../src/component/shared/Navbar/Navbar'
import Footer from '../src/component/shared/Footer/Footer'

import Head from 'next/head'
import {
	Box,
	Button,
	Container,
	Grid,
	Tooltip,
	Snackbar,
	Typography,
	Alert,
	CircularProgress,
	Stack,
} from '@mui/material'
import BaseStepper from '../src/component/reuseable/baseStepper/BaseStepper'
import { Fragment, useEffect, useState } from 'react'
import PersonalData from '../src/component/brokerRegistration/personalData/PersonalData'
import AddressData from '../src/component/brokerRegistration/Address/AddressData'
import PerformanceData from '../src/component/brokerRegistration/performance/PerformanceData'
import Image from 'next/image'
import stepFinish from '../public/Images/step_finish.png'
import BrokerRegistrationFooter from '../src/component/shared/Footer/BrokerRegistrationFooter'
import BaseModal from '../src/component/reuseable/baseModal/BaseModal'
import BrokerRegistrationSentModal from '../src/component/brokerRegistration/BrokerRegistrationSendModal/BrokerRegistrationSendModal'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { findStateData } from '../src/redux/state/actions'
import { useDispatch, useSelector } from 'react-redux'
import { serialize } from 'object-to-formdata'
import { emailVerifyApi, registrationApi, userDetailsApi } from '../src/api'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { signIn } from 'next-auth/react'
import en from 'locales/en'
import pt from 'locales/pt'

const validationSchema = Yup.object().shape({
	full_name: Yup.string().required('Full Name is required'),
	creci_number: Yup.string().required('CRECI number is required'),
	cpf_number: Yup.string().required('CPF number is required'),
	rg_number: Yup.string().required('RG number is required'),
	dob: Yup.string().required('Date of Birth number is required'),
	zip_code: Yup.string().required('Zip code number is required'),
	address: Yup.string().required('Address is required'),
	number: Yup.string().required('Number is required'),
	neighbourhood: Yup.string().required('Neighbourhood is required'),
	state: Yup.object().required('State is required'),
	city: Yup.string().required('City is required'),
})

const aboutLokkanData = [
	'Refer a friend',
	'Facebook',
	'Instagram',
	'Linkedin',
	'News',
	'Partnership',
]

const omitEmpties = (obj) => {
	return Object.entries(obj).reduce((carry, [key, value]) => {
		if (![null, undefined, '', [], {}].includes(value)) {
			carry[key] = value
		}
		return carry
	}, {})
}

export default function BrokerRegistration({
	loginOpen,
	setLoginOpen,
	handleLoginOpen,
	handleLoginClose,
	language,
}) {
	const router = useRouter()
	const { query } = router

	const [myValue, setMyValue] = useState(language || 'pt')

	const t = myValue === 'en' ? en : pt

	const preferenceData = ['rent', 'sale', 'both']

	const steps = ['Personal data', 'Address', 'Performance']

	const [successMessage, setSuccessMessage] = useState('')
	const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

	const handleClickSuccessSnackbar = () => {
		setSuccessSnackbarOpen(true)
	}

	const handleCloseSuccessSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSuccessSnackbarOpen(false)
	}

	useEffect(() => {
		const getData = async () => {
			if (query?.token) {
				const [err, resp] = await emailVerifyApi(query?.token)
				if (!err) {
					// console.log({ resp })
					localStorage.setItem('token', resp?.data?.token)
					const [error, response] = await userDetailsApi()
					if (!error) {
						return signIn('credentials', {
							userId: response.data.user.id,
							userEmail: response.data.user.email,
							name: response.data.user.name,
							phone: response.data.user.phone,
							status: response.data.user.status,
							role: response.data.user.roles[0].slug,
							roleId: response.data.user.roles[0].id,
							permissions: JSON.stringify(
								response.data.user.roles[0].permissions
							),
							callbackUrl:
								response.data.user.roles[0].slug === 'buyer'
									? '/'
									: '/my_properties',
						})
					}
				}
			} else {
				return
			}
		}
		getData()
	}, [query?.token])

	const [activeStep, setActiveStep] = useState(0)
	const [skipped, setSkipped] = useState(new Set())
	const dispatch = useDispatch()
	const isStepOptional = (step) => {
		return step === 1
	}

	const isStepSkipped = (step) => {
		return skipped.has(step)
	}

	const handleNext = () => {
		let newSkipped = skipped
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values())
			newSkipped.delete(activeStep)
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		setSkipped(newSkipped)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.")
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values())
			newSkipped.add(activeStep)
			return newSkipped
		})
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	const [snackbarOpen, setSnackbarOpen] = useState(false)

	const handleClickSnackbar = () => {
		setSnackbarOpen(true)
	}

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSnackbarOpen(false)
	}

	const [sentModalOpen, setSentModalOpen] = useState(false)
	const handleOpen = () => setSentModalOpen(true)
	const handleClose = () => setSentModalOpen(false)

	const [actingPreferenceBtn, setActingPreferenceBtn] = useState(
		preferenceData[0]
	)
	const [aboutLokkanBtn, setAboutLokkanBtn] = useState(aboutLokkanData[0])
	const [loading, setLoading] = useState(false)
	const {
		register,
		watch,
		control,
		handleSubmit,
		setValue,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(validationSchema),
	})

	const allValues = watch()

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			handleClickSnackbar()
		}
	}, [errors])

	const onSubmit = async (data) => {
		setLoading(true)
		const previousFieldData = JSON.parse(
			localStorage.getItem('broker_registration')
		)

		const additionalInfoData = omitEmpties({
			full_name: data.full_name,
			creci_number: data.creci_number,
			cpf: data.cpf_number,
			rg: data.rg_number,
			dob: dayjs(data.dob).format('YYYY-MM-DD'),
			social_name: data.social_name,
			broker_type: actingPreferenceBtn,
			referred_from: aboutLokkanBtn,
		})
		const addressData = omitEmpties({
			zip_code: data.zip_code,
			address: data.address,
			number: data.number,
			neighbourhood: data.neighbourhood,
			add_on: data.add_on,
			city: data.city,
			state_id: data.state.id,
		})

		const firstPartData = omitEmpties({
			image: data.image,
			name: previousFieldData.name,
			email: previousFieldData.email,
			password: previousFieldData.password,
			role_id: previousFieldData.role_id,
			phone: previousFieldData.phone,
			redirect_url: window.location.href,
		})

		const requireData = {
			...firstPartData,
			additional_info: additionalInfoData,
			address: addressData,
		}

		console.log({ requireData })

		const formData = serialize(requireData, { indices: true })
		const [error, responseToken] = await registrationApi(formData)

		setLoading(false)
		if (!error) {
			setSentModalOpen(true)
			setSuccessMessage(responseToken?.data?.message)
			handleClickSuccessSnackbar()
		} else {
			const errors = error?.response?.data?.errors ?? {}
			console.log({ error })
			Object.entries(errors).forEach(([name, messages]) => {
				setError(name, { type: 'manual', message: messages[0] })
			})
			// setLoading(false);
		}
	}

	return (
		<div>
			<Head>
				<title>Lokkan</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/negotiate.png" />
			</Head>

			<main className="section">
				<Navbar
					shape={false}
					loginOpen={loginOpen}
					setLoginOpen={setLoginOpen}
					handleLoginClose={handleLoginClose}
					handleLoginOpen={handleLoginOpen}
					languageName={language}
					setMyValue={setMyValue}
					myValue={myValue}
				/>
				<Box>
					<Container maxWidth="md">
						<BaseStepper
							steps={steps}
							activeStep={activeStep}
							isStepSkipped={isStepSkipped}
							setActiveStep={setActiveStep}
							marginTop={'2vh'}
						/>

						{activeStep === steps.length ? (
							<Container maxWidth="xs">
								<Fragment></Fragment>
							</Container>
						) : (
							<Fragment>
								<form onSubmit={handleSubmit(onSubmit)}>
									{activeStep === 0 ? (
										<PersonalData
											handleNext={handleNext}
											control={control}
											errors={errors}
											allValues={allValues}
											languageName={myValue.toString()}
										/>
									) : activeStep === 1 ? (
										<AddressData
											handleNext={handleNext}
											handleBack={handleBack}
											control={control}
											errors={errors}
											allValues={allValues}
											setValue={setValue}
											languageName={myValue.toString()}
											// allStateData={allStateData}
										/>
									) : (
										<PerformanceData
											handleNext={handleNext}
											handleBack={handleBack}
											handleOpen={handleOpen}
											activeStep={activeStep}
											steps={steps}
											preferenceData={preferenceData}
											aboutLokkanData={aboutLokkanData}
											actingPreferenceBtn={actingPreferenceBtn}
											setActingPreferenceBtn={setActingPreferenceBtn}
											aboutLokkanBtn={aboutLokkanBtn}
											setAboutLokkanBtn={setAboutLokkanBtn}
											languageName={myValue.toString()}
										/>
									)}
									{errors && (
										<Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
											{Object.keys(errors).map((key, index) => (
												<Alert key={index} severity="error">
													{errors[key].message}
												</Alert>
											))}
										</Stack>
									)}
									{activeStep === 2 && (
										<Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
											<Grid item xs={6} sm={6} md={6}>
												<Button
													color="inherit"
													disabled={activeStep === 0}
													onClick={handleBack}
													sx={{
														//   mr: 1,
														//   border: "1px solid #002152",
														//   borderRadius: "4px",
														background: '#ffffff',
														px: 2,
														py: 1,
														color: '#4B4B66',
														fontSize: '16px',
														fontWeight: '600',
														lineHeight: '22px',
														textTransform: 'none',
													}}
												>
													{t['Come back']}
												</Button>
											</Grid>
											<Grid item xs={6} sm={6} md={6}>
												<Button
													type="submit"
													fullWidth
													sx={{
														background: '#00C1B4',
														boxShadow:
															'0px 4px 34px rgba(0, 0, 0, 0.08)',
														borderRadius: '4px',
														color: '#ffffff',
														fontSize: '16px',
														lineHeight: '22px',
														fontWeight: '600',
														//   mt: 3,
														textTransform: 'none',
														py: 1,
														'&:hover': {
															background: '#00C1B4',
															boxShadow:
																'0px 4px 34px rgba(0, 0, 0, 0.08)',
															borderRadius: '4px',
															color: '#ffffff',
															fontSize: '16px',
															lineHeight: '22px',
															fontWeight: '600',
															// mt: 3,
															textTransform: 'none',
															py: 1,
														},
													}}
												>
													{loading && (
														<CircularProgress
															size={22}
															color="inherit"
														/>
													)}
													{!loading && t['Register']}
												</Button>
											</Grid>
										</Grid>
									)}
								</form>
								{activeStep !== 2 && (
									<Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
										<Grid item xs={6} sm={6} md={6}>
											<Button
												color="inherit"
												disabled={activeStep === 0}
												onClick={handleBack}
												sx={{
													//   mr: 1,
													//   border: "1px solid #002152",
													//   borderRadius: "4px",
													background: '#ffffff',
													px: 2,
													py: 1,
													color: '#4B4B66',
													fontSize: '16px',
													fontWeight: '600',
													lineHeight: '22px',
													textTransform: 'none',
												}}
											>
												{t['Come back']}
											</Button>
										</Grid>
										<Grid item xs={6} sm={6} md={6}>
											<Button
												onClick={handleNext}
												fullWidth
												sx={{
													background: '#00C1B4',
													boxShadow:
														'0px 4px 34px rgba(0, 0, 0, 0.08)',
													borderRadius: '4px',
													color: '#ffffff',
													fontSize: '16px',
													lineHeight: '22px',
													fontWeight: '600',
													//   mt: 3,
													textTransform: 'none',
													py: 1,
													'&:hover': {
														background: '#00C1B4',
														boxShadow:
															'0px 4px 34px rgba(0, 0, 0, 0.08)',
														borderRadius: '4px',
														color: '#ffffff',
														fontSize: '16px',
														lineHeight: '22px',
														fontWeight: '600',
														// mt: 3,
														textTransform: 'none',
														py: 1,
													},
												}}
											>
												{t['Continue']}
											</Button>
										</Grid>
									</Grid>
								)}
								<Snackbar
									open={snackbarOpen}
									autoHideDuration={6000}
									onClose={handleCloseSnackbar}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									key={'top'}
								>
									<Alert
										onClose={handleCloseSnackbar}
										severity="error"
										sx={{ width: '100%' }}
									>
										Fill up the required field!
									</Alert>
								</Snackbar>
								<Snackbar
									open={successSnackbarOpen}
									autoHideDuration={6000}
									onClose={handleCloseSuccessSnackbar}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									key={'bottom'}
								>
									<Alert
										onClose={handleCloseSuccessSnackbar}
										severity="success"
										sx={{ width: '100%' }}
									>
										{successMessage && successMessage}
									</Alert>
								</Snackbar>
							</Fragment>
						)}
					</Container>
					<BaseModal isShowing={sentModalOpen} isClose={handleClose}>
						<Tooltip title="Something">
							<>
								<BrokerRegistrationSentModal
									handleClose={handleClose}
								/>
							</>
						</Tooltip>
					</BaseModal>
				</Box>
				<BrokerRegistrationFooter />
			</main>
		</div>
	)
}

export async function getServerSideProps(context) {
	const cookies = context.req.cookies['language'] || 'pt'
	return {
		props: {
			language: cookies,
		},
	}
}

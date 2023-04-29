import Head from 'next/head'
import Image from 'next/image'
import {
	Alert,
	Button,
	CircularProgress,
	Container,
	Grid,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material'
import { Box } from '@mui/material'
import ResponsiveDrawer from '../../../src/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer'
import logo from '../../../public/Images/logo.png'
import BasicBreadcrumbs from '../../../src/component/reuseable/baseBreadCrumb/BaseBreadCrumb'
import BaseStepper from '../../../src/component/reuseable/baseStepper/BaseStepper'
import { Fragment, useEffect, useState } from 'react'
import ProposalValueStep from '../../../src/component/properties/ProposalValueStep/ProposalValueStep'
import BuyerDataStep from '../../../src/component/properties/BuyerDataStep/BuyerDataStep'
import BaseModal from '../../../src/component/reuseable/baseModal/BaseModal'
import ProposalSentModal from '../../../src/component/properties/ProposalSentModal/ProposalSentModal'
import Address from '../../../src/component/new property/Address/Address'
import ValuesAndDescription from '../../../src/component/new property/ValuesAndDescription/ValuesAndDescription'
import PhotosAndVideos from '../../../src/component/new property/PhotosAndVideos/PhotosAndVideos'
import Features from '../../../src/component/new property/Features/Features'
import Owner from '../../../src/component/new property/Owner/Owner'
import PropertySubmittedModal from '../../../src/component/new property/PropertySubmittedModal/PropertySubmittedModal'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { findProjectsData } from '../../../src/redux/projects/actions'
import { findPropertyTypeData } from '../../../src/redux/propertyType/actions'
import { propertyCreateApi } from '../../../src/api'
import { serialize } from 'object-to-formdata'
import { useRouter } from 'next/router'
import { findSinglePropertyData } from '../../../src/redux/singleProperty/actions'

const drawerWidth = 240

const BreadCrumbsData = [
	{ stage: 'Start', route: '' },
	{ stage: 'My properties', route: '' },
]

const steps = [
	'Address',
	'Values and description',
	'Features',
	'Photos and videos',
	'Owner',
]

const validationSchema = Yup.object().shape({
	project_id: Yup.object().required('Enterprise is required'),
	zip_code: Yup.string().required('Zip code is required'),
	address: Yup.string().required('Address is required'),
	number: Yup.string().required('Number is required'),
	neighbourhood: Yup.string().required('Neighbourhood is required'),
	// complement: Yup.string().required("Complement is required"),
	city: Yup.string().required('City is required'),
	state: Yup.object().required('State is required'),
	brl_rent: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('BRL rent is required'),
	condominium: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('Condominium is required'),
	brl_iptu: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('IPTU is required'),
	land_area: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('Land area is required'),
	property_area: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('Property area is required'),
	no_of_rooms: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('No of rooms is required'),
	no_of_suites: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('NO of suites is required'),
	no_of_bathrooms: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('NO of bathrooms is required'),
	no_of_parking_spaces: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('NO of parking spaces is required'),
	// documnentation: Yup.object().required("Documentation is required"),
	// registry: Yup.string().required("Registry office is required"),
	// registartion_number: Yup.number()
	//   .transform((value) => (Number.isNaN(value) ? null : value))
	//   .nullable()
	//   .required("Registration number office is required"),
	owner_name: Yup.string().required('Owner Full Name is required'),
	owner_rg: Yup.string().required('Owner Rg is required'),
	owner_cpf: Yup.string().required('Owner cpf is required'),
	owner_spouse_name: Yup.string().required(
		'Owner spouse full name is required'
	),
	owner_spouse_rg: Yup.string().required('Owner spouse RG is required'),
	owner_spouse_cpf: Yup.string().required('Owner spouse CPF is required'),
	owner_zip_code: Yup.string().required('Owner Zip code is required'),
	owner_address: Yup.string().required('Owner Address is required'),
	owner_number: Yup.number()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.nullable()
		.required('Owner Number is required'),
	owner_neighbourhood: Yup.string().required(
		'Owner Neighbourhood is required'
	),
	// owner_complement: Yup.string().required("Complement is required"),
	owner_city: Yup.string().required('Owner City is required'),
	owner_state: Yup.object().required('Owner State is required'),
	// owner_documnentation: Yup.object().required("Documentation is required"),
	// owner_registry: Yup.string().required("Registry office is required"),
	// owner_registration_number: Yup.number()
	//   .transform((value) => (Number.isNaN(value) ? null : value))
	//   .nullable()
	//   .required("Registration number office is required"),
})

export default function NewProperty(props) {
	const { data: session } = useSession()

	const { query } = useRouter()

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(findSinglePropertyData(query?.property_id))
	}, [dispatch, query?.property_id])
	const singleData = useSelector(
		(state) => state?.singleProperty?.singlePropertyData
	)

	const {
		register,
		watch,
		control,
		setError,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			videos: [
				{
					url: '',
					title: null,
				},
			],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'videos',
	})
	const [loading, setLoading] = useState(false)
	const [draftloading, setDraftLoading] = useState(false)
	const [activeStep, setActiveStep] = useState(0)
	const [skipped, setSkipped] = useState(new Set())
	const [featuretypes, setFeatureTypes] = useState([])
	const [documents, setDocuments] = useState([])
	const [adType, setAdType] = useState('Rent')
	const [propertyType, setPropertyType] = useState('Residential')
	const [property_detail_id, setPropertyDetailId] = useState(1)
	const [files, setFiles] = useState([])
	const [imageError, setImageError] = useState(false)
	const [imageErrorMessage, setImageErrorMessage] = useState('')
	const [ErrorsData, setErrorsData] = useState(false)
	const [ErrorMessage, setErrorMessage] = useState({})
	const [maritalStatus, setMaritalStatus] = useState('Married')
	const [sentModalOpen, setSentModalOpen] = useState(false)
	const [action, setAction] = useState('')
	const handleOpen = () => setSentModalOpen(true)
	const handleClose = () => setSentModalOpen(false)

	useEffect(() => {
		if (files?.length > 0) {
			delete errors?.images
		}
	}, [files, errors])

	useEffect(() => {
		if (documents?.length > 0) {
			delete errors?.document_files
		}
	})

	useEffect(() => {
		if (query?.property_id) {
			setAdType(
				singleData?.ad_type?.charAt(0).toUpperCase() +
					singleData?.ad_type?.slice(1)
			)
			setPropertyType(
				singleData?.property_type?.charAt(0).toUpperCase() +
					singleData?.property_type?.slice(1)
			)
			setDocuments(singleData?.documents)
			setPropertyDetailId(+singleData?.property_detail_id)
			setDocuments(singleData?.documents)
			setValue('project_id', singleData?.project)
			setValue('zip_code', singleData?.address?.zip_code)
			setValue('address', singleData?.address?.address)
			setValue('number', singleData?.address?.number),
				setValue('neighbourhood', singleData?.address?.neighbourhood)
			setValue('complement', singleData?.address?.complement)
			setValue('city', singleData?.address?.city)
			setValue('complement', singleData?.address?.complement)
			setValue('state', singleData?.address?.state)
			setValue('brl_rent', singleData?.brl_rent)
			setValue('brl_iptu', singleData?.brl_iptu)
			setValue('condominium', singleData?.condominium)
			setValue('land_area', singleData?.land_area)
			setValue('property_area', singleData?.property_area)
			setValue('no_of_rooms', singleData?.no_of_rooms)
			setValue('no_of_suites', singleData?.no_of_suites)
			setValue('no_of_bathrooms', singleData?.no_of_bathrooms)
			setValue('no_of_parking_spaces', singleData?.no_of_parking_spaces)

			let selectFeatures = []
			singleData?.features?.forEach((data) => {
				selectFeatures.push(data.id)
			})
			setFeatureTypes(selectFeatures)
			let allSelectImages = singleData?.attachments?.filter(
				(data) => data?.file_type === 'image'
			)

			setFiles(allSelectImages)

			let allSelectVideos = singleData?.attachments?.filter(
				(data) => data?.file_type === 'url'
			)

			const urlEditData = allSelectVideos?.map((info) => {
				return {
					url: info?.file_path,
					title: info?.photo_type,
				}
			})
			setValue('videos', urlEditData)
			setValue('owner_name', singleData?.property_owner?.name)
			setValue('owner_rg', singleData?.property_owner?.rg)
			setValue('owner_cpf', singleData?.property_owner?.cpf)
			setValue('owner_spouse_name', singleData?.property_owner?.spouse_name)
			setValue('owner_spouse_rg', singleData?.property_owner?.spouse_rg)
			setValue('owner_spouse_cpf', singleData?.property_owner?.spouse_cpf)
			setValue(
				'owner_zip_code',
				singleData?.property_owner?.address?.zip_code
			)
			setValue('owner_address', singleData?.property_owner?.address?.address)
			setValue('owner_number', singleData?.property_owner?.address?.number)
			setValue(
				'owner_neighbourhood',
				singleData?.property_owner?.address?.neighbourhood
			)
			setValue('owner_city', singleData?.property_owner?.address?.city)
			setValue('owner_state', singleData?.property_owner?.address?.state)
			setValue(
				'owner_complement',
				singleData?.property_owner?.address?.complement
			)
			setValue(
				'owner_registry',
				singleData?.property_owner?.registry[0]?.registry_office
			)
			setValue(
				'owner_registration_number',
				+singleData?.property_owner?.registry[0]?.registry_number
			)
			setValue('owner_documentation', {
				label: singleData?.property_owner?.registry[0]?.title,
				year: '2009',
			})

			setValue('registry', singleData?.registry?.[0]?.registry_office)
			setValue(
				'registration_number',
				+singleData?.registry?.[0]?.registry_number
			)
			setValue('documentation', {
				label: singleData?.registry?.[0]?.title,
				year: '2009',
			})
		}
	}, [query?.property_id, setValue, singleData])

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

	const omitEmpties = (obj) => {
		return Object.entries(obj).reduce((carry, [key, value]) => {
			if (![null, undefined, '', [], {}].includes(value)) {
				carry[key] = value
			}
			return carry
		}, {})
	}

	const allValues = watch()

	const onSubmit = async (data) => {
		action === 'new' ? setLoading(true) : setDraftLoading(true)

		// if (files.length > 0 && featuretypes.length > 0) {
		let newArr = []
		files?.forEach((data, index) => {
			newArr.push({ file: data, title: allValues[`title_${index}`].slug })
		})

		const firstPartData = omitEmpties({
			user_id: +session?.user?.userId,
			project_id: +data?.project_id?.id,
			property_detail_id: +property_detail_id,
			ad_type: adType.toLocaleLowerCase(),
			property_type: propertyType.toLocaleLowerCase(),
			condominium: data?.condominium,
			brl_rent: data?.brl_rent,
			brl_iptu: data?.brl_iptu,
			land_area: data?.land_area,
			property_area: data?.property_area,
			no_of_rooms: data?.no_of_rooms,
			no_of_suites: data?.no_of_suites,
			no_of_bathrooms: data?.no_of_bathrooms,
			no_of_parking_spaces: data?.no_of_parking_spaces,
			features: featuretypes,
			status: action,
			document_files: documents,
			content_url: data?.videos[0].url !== '' ? data?.videos : null,
			images: newArr,
			// documents: "",
			// registry: "",
			// registration_number: "",
		})

		const addressData = omitEmpties({
			zip_code: data?.zip_code,
			address: data?.address,
			city: data?.city,
			state_id: data?.state?.id,
			number: data?.number,
			neighbourhood: data?.neighbourhood,
			complement: data?.complement,
		})

		const registryData = omitEmpties({
			registry_office: data?.registry,
			registry_number: data?.registration_number,
			document_title: data?.documentation?.label,
		})

		const ownerData = omitEmpties({
			maritalStatus: maritalStatus,
			name: data?.owner_name,
			rg: data?.owner_rg,
			cpf: data?.owner_cpf,
			spouse_name: data?.owner_spouse_name,
			spouse_rg: data?.owner_spouse_rg,
			spouse_cpf: data?.owner_spouse_cpf,
		})

		const ownerDataAddress = omitEmpties({
			zip_code: data?.owner_zip_code,
			address: data?.owner_address,
			city: data?.owner_city,
			state_id: data?.owner_state?.id,
			number: data?.number,
			neighbourhood: data?.neighbourhood,
			complement: data?.complement,
		})

		const ownerRegistryData = omitEmpties({
			registry_office: data?.owner_registry,
			registry_number: data?.owner_registration_number,
			document_title: data?.owner_documnentation?.label,
		})
		const requireData = {
			...firstPartData,
			registry_data: registryData,
			address: addressData,
			owner_datas: {
				...ownerData,
				address: ownerDataAddress,
				registry_data: ownerRegistryData,
			},
		}

		const formData = serialize(requireData, { indices: true })
		const [error, response] = await propertyCreateApi(formData)
		setLoading(false)
		setDraftLoading(false)
		if (!error) {
			setSentModalOpen(true)
			reset()
		} else {
			const errors = error?.response?.data?.errors ?? {}
			Object.entries(errors).forEach(([name, messages]) => {
				setError(name, { type: 'manual', message: messages[0] })
			})
		}
	}

	return (
		<div>
			<Head>
				<title>Lokkan</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/negotiate.png" />
			</Head>

			<main>
				<Box sx={{ display: 'flex' }}>
					<ResponsiveDrawer />
					<Box
						sx={{
							//   backgroundColor: "#f6f8fc",
							flexGrow: 1,

							width: { sm: `calc(100% - ${drawerWidth}px)` },
							paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
							paddingY: { xs: 0, sm: 0, md: 3, lg: 3, xl: 3 },
						}}
					>
						<Container maxWidth="lg">
							<Grid
								container
								direction="row"
								justifyContent="flex-start"
								alignItems="flex-start"
								sx={{ mt: { xs: 8, sm: 8, md: 8, lg: 0 } }}
							>
								<BasicBreadcrumbs
									BreadcrumbsData={BreadCrumbsData}
									lastStageData={'New property'}
								/>
							</Grid>
							<Box sx={{ mt: 3 }}>
								<BaseStepper
									steps={steps}
									activeStep={activeStep}
									isStepSkipped={isStepSkipped}
									setActiveStep={setActiveStep}
									marginTop={'2vh'}
								/>
								{activeStep === steps.length ? (
									<Container maxWidth="xs">
										<Fragment>
											{/* <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography> */}

											{/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
										</Fragment>
									</Container>
								) : (
									<Fragment>
										<form onSubmit={handleSubmit(onSubmit)}>
											{activeStep === 0 ? (
												<Address
													handleNext={handleNext}
													control={control}
													errors={errors}
													documents={documents}
													setDocuments={setDocuments}
													adType={adType}
													setAdType={setAdType}
													propertyType={propertyType}
													setPropertyType={setPropertyType}
													property_detail_id={property_detail_id}
													setPropertyDetailId={setPropertyDetailId}
												/>
											) : activeStep === 1 ? (
												<ValuesAndDescription
													handleNext={handleNext}
													handleBack={handleBack}
													control={control}
													errors={errors}
												/>
											) : activeStep === 2 ? (
												<Features
													handleNext={handleNext}
													handleBack={handleBack}
													control={control}
													errors={errors}
													featuretypes={featuretypes}
													setFeatureTypes={setFeatureTypes}
												/>
											) : activeStep === 3 ? (
												<PhotosAndVideos
													handleNext={handleNext}
													handleBack={handleBack}
													control={control}
													errors={errors}
													files={files}
													setFiles={setFiles}
													imageError={imageError}
													imageErrorMessage={imageErrorMessage}
													fields={fields}
													append={append}
													remove={remove}
												/>
											) : (
												<Owner
													handleNext={handleNext}
													handleBack={handleBack}
													control={control}
													errors={errors}
													maritalStatus={maritalStatus}
													setMaritalStatus={setMaritalStatus}
												/>
											)}
											{errors && (
												<Stack
													sx={{ width: '100%', mt: 2 }}
													spacing={2}
												>
													{Object.keys(errors).map(
														(key, index) => (
															<Alert
																key={index}
																severity="error"
															>
																{errors[key].message}
															</Alert>
														)
													)}
												</Stack>
											)}
											<Grid
												container
												direction="row"
												justifyContent={{
													xs: 'flex-start',
													sm: 'flex-start',
													md: 'flex-start',
													lg: 'flex-end',
													xl: 'flex-end',
												}}
												alignItems="center"
												sx={{
													pt: 2,
												}}
											>
												{activeStep !== 0 && (
													<Button
														color="inherit"
														// disabled={activeStep === 0}
														onClick={handleBack}
														sx={{
															mr: 1,
															border: '1px solid #002152',
															borderRadius: '4px',
															px: 2,
															py: 1,
															color: '#002152',
															fontSize: '16px',
															fontWeight: '600',
															lineHeight: '22px',
															textTransform: 'none',
														}}
													>
														Come back
													</Button>
												)}
												{activeStep === 0 && (
													<Link href="/my_properties">
														<Button
															color="inherit"
															// disabled={activeStep === 0}
															onClick={handleBack}
															sx={{
																mr: 1,
																border: '1px solid #002152',
																borderRadius: '4px',
																px: 2,
																py: 1,
																color: '#002152',
																fontSize: '16px',
																fontWeight: '600',
																lineHeight: '22px',
																textTransform: 'none',
															}}
														>
															Cancel
														</Button>
													</Link>
												)}

												{/* {isStepOptional(activeStep) && (
                <Button
                  sx={{
                    mr: 1,
                    border: "1px solid #002152",
                    borderRadius: "4px",
                    px: 2,
                    py: 1,
                    color: "#002152",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "22px",
                    textTransform: "none",
                  }}
                  color="inherit"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )} */}
												{activeStep === steps.length - 1 && (
													<Box>
														<Button
															type="submit"
															onClick={() => setAction('draft')}
															sx={{
																background: '#DBE1E5',
																borderRadius: '4px',
																px: 2,
																py: 1,
																mr: 1,
																color: '#002152',
																fontSize: '16px',
																fontWeight: '600',
																lineHeight: '22px',
																textTransform: 'none',

																'&:hover': {
																	background: '#DBE1E5',
																	borderRadius: '4px',
																	px: 2,
																	py: 1,
																	color: '#002152',
																	fontSize: '16px',
																	fontWeight: '600',
																	lineHeight: '22px',
																	textTransform: 'none',
																	mr: 1,
																},
															}}
														>
															{draftloading && (
																<CircularProgress
																	size={22}
																	color="inherit"
																/>
															)}
															{!draftloading && 'Save as draft'}
														</Button>
														<Button
															type="submit"
															onClick={() => setAction('new')}
															sx={{
																background: '#7450F0',
																borderRadius: '4px',
																px: 2,
																py: 1,
																color: '#ffffff',
																fontSize: '16px',
																fontWeight: '600',
																lineHeight: '22px',
																textTransform: 'none',
																boxShadow:
																	'0px 4px 8px rgba(81, 51, 182, 0.32)',
																'&:hover': {
																	background: '#7450F0',
																	borderRadius: '4px',
																	px: 2,
																	py: 1,
																	color: '#ffffff',
																	fontSize: '16px',
																	fontWeight: '600',
																	lineHeight: '22px',
																	textTransform: 'none',
																	boxShadow:
																		'0px 4px 8px rgba(81, 51, 182, 0.32)',
																},
															}}
														>
															{loading && (
																<CircularProgress
																	size={22}
																	color="inherit"
																/>
															)}
															{!loading && 'Submit Approval'}
														</Button>
													</Box>
												)}
												{activeStep !== steps.length - 1 && (
													<Button
														onClick={handleNext}
														sx={{
															background: '#7450F0',
															borderRadius: '4px',
															px: 2,
															py: 1,
															color: '#ffffff',
															fontSize: '16px',
															fontWeight: '600',
															lineHeight: '22px',
															textTransform: 'none',
															boxShadow:
																'0px 4px 8px rgba(81, 51, 182, 0.32)',
															'&:hover': {
																background: '#7450F0',
																borderRadius: '4px',
																px: 2,
																py: 1,
																color: '#ffffff',
																fontSize: '16px',
																fontWeight: '600',
																lineHeight: '22px',
																textTransform: 'none',
																boxShadow:
																	'0px 4px 8px rgba(81, 51, 182, 0.32)',
															},
														}}
													>
														Next
													</Button>
												)}
											</Grid>
										</form>
									</Fragment>
								)}
							</Box>
							<BaseModal isShowing={sentModalOpen} isClose={handleClose}>
								<Tooltip title="Something">
									<>
										<PropertySubmittedModal
											handleClose={handleClose}
										/>
									</>
								</Tooltip>
							</BaseModal>
						</Container>
					</Box>
				</Box>
			</main>
		</div>
	)
}

export async function getServerSideProps(context) {
	//* Session for SSG
	const session = await getSession(context)
	//? If Not Logged In
	if (!session) {
		return {
			redirect: {
				destination: '/',
			},
			props: {
				session: null,
			},
		}
	}

	return {
		props: {
			session: session,
		},
	}
}

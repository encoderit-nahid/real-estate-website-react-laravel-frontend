import Navbar from '../src/component/shared/Navbar/Navbar'
import Footer from '../src/component/shared/Footer/Footer'
import shapeIcon from '../public/Images/eclipseShape.png'
import Head from 'next/head'
import {
	Box,
	Grid,
	Typography,
	Container,
	ImageList,
	ImageListItem,
} from '@mui/material'
import FulfillDream from '../src/component/home/fullfill/FulfillDream'
import SideContent from '../src/component/home/FullfillSideContent/SideContent'
import SellSideContent from '../src/component/home/wantToSellSideContent/SellSideContent'
import mobileGray from '../public/Images/mobileGray.png'
import mobileBlue from '../public/Images/mobileBlue.png'
import WantSellSvgBackground from '../src/component/svg/WantSellSvgBackground'
import { renderToStaticMarkup } from 'react-dom/server'
import WantToSell from '../src/component/home/wantToSell/WantToSell'
import BrokerRegisterContent from '../src/component/home/whoIsBroker/brokerRegister/BrokerRegisterContent'
import BrokerImageContent from '../src/component/home/whoIsBroker/brokerContent/BrokerImageContent'
import BestDealSvgBackground from '../src/component/svg/BestDealSvgBackground'
import HouseCard from '../src/component/reuseable/HouseCard/HouseCard'
import MobileSideContent from '../src/component/home/FullfillSideContent/MobileSideContent'
import BrokerImageContentMobile from '../src/component/home/whoIsBroker/brokerContent/BrokerImageContentMobile'
import BrokerHelp from '../src/component/IAmBroker/BrokerHelp/BrokerHelp'
import BrokerHelpContent from '../src/component/IAmBroker/BrokerHelp/BrokerHelpContent'
import BecomeBrokerContent from '../src/component/IAmBroker/BecomeBroker/BecomeBrokerContent'
import BecomeBroker from '../src/component/IAmBroker/BecomeBroker/BecomeBroker'
import CalulateComission from '../src/component/IAmBroker/MaxmizeResult/CalulateComission'
import ComissionResult from '../src/component/IAmBroker/MaxmizeResult/ComissionResult'
import BrokerFacilities from '../src/component/IAmBroker/BrokerFacilities/BrokerFacilities'
import brokerHelpImage from '../public/Images/broker_help.png'
import usersColor from '../public/Images/users-colored.png'
import dealColor from '../public/Images/deal-coloerd.png'
import houseColor from '../public/Images/house-colored.png'
import moneyColor from '../public/Images/money-colored.png'
import timeColor from '../public/Images/time-colored.png'
import { useState } from 'react'
import GetCookie from '@/hooks/getCookie'
import en from 'locales/en'
import pt from 'locales/pt'

const facilitiesData = [
	{
		name: 'ready customers',
		content: 'Get customers who are ready to close deals',
		image: usersColor,
	},
	{
		name: 'highest commission',
		content:
			'Receive the highest commission on the market, keep up to 70% of the full amount',
		image: moneyColor,
	},
	{
		name: 'Flexibility',
		content:
			'Work wherever you are and with flexible hours and total autonomy',
		image: timeColor,
	},
]

const facilitiesBottomData = [
	{
		name: 'Properties',
		content:
			'Get access to the property database, with third-party properties, launches by land developers, builders and developers in several cities',
		image: houseColor,
	},
	{
		name: 'Good Business',
		content:
			'Receive customers who have already negotiated price and payment method and are ready to close the deal',
		image: dealColor,
	},
]

// const becomeBrokerData = [
// 	{
// 		name: 'free of bureaucracy',
// 		info: 'You will receive qualified Leads not only from your properties, but from all in your region, as well as scheduling visits, proposals, directly in your control panel.',
// 	},
// 	{
// 		name: 'Highest commission on the market',
// 		info: 'You receive 70% of the commission negotiated with the property owner (raising and commission).',
// 	},
// 	{
// 		name: 'Autonomy',
// 		info: "At Lokkan you are the owner of your business, you don't have a boss, you don't have to pay for the phone, ads, lawyers, documents and you still receive the highest commission on the market.",
// 	},
// 	{
// 		name: 'Access to the entire property database',
// 		info: "You will have access to Lokkan's property database, which is made up of properties registered by owner, launches by land developers, builders and developers in several cities.",
// 	},
// ]

export default function Broker({
	loginOpen,
	setLoginOpen,
	handleLoginOpen,
	handleLoginClose,
	language,
}) {
	const svgString = encodeURIComponent(
		renderToStaticMarkup(<WantSellSvgBackground />)
	)

	const [myValue, setMyValue] = useState(language || 'en')

	const t = myValue === 'en' ? en : pt

	const becomeBrokerData = [
		{
			name: t['free of bureaucracy'],
			info: 'You will receive qualified Leads not only from your properties, but from all in your region, as well as scheduling visits, proposals, directly in your control panel.',
		},
		{
			name: t['Highest commission on the market'],
			info: 'You receive 70% of the commission negotiated with the property owner (raising and commission).',
		},
		{
			name: t['Autonomy'],
			info: "At Lokkan you are the owner of your business, you don't have a boss, you don't have to pay for the phone, ads, lawyers, documents and you still receive the highest commission on the market.",
		},
		{
			name: t['Access to the entire property database'],
			info: "You will have access to Lokkan's property database, which is made up of properties registered by owner, launches by land developers, builders and developers in several cities.",
		},
	]

	const facilitiesData = [
		{
			name: t['ready customers'],
			content: 'Get customers who are ready to close deals',
			image: usersColor,
		},
		{
			name: t['highest commission'],
			content:
				'Receive the highest commission on the market, keep up to 70% of the full amount',
			image: moneyColor,
		},
		{
			name: t['Flexibility'],
			content:
				'Work wherever you are and with flexible hours and total autonomy',
			image: timeColor,
		},
	]

	const facilitiesBottomData = [
		{
			name: t['Properties'],
			content:
				'Get access to the property database, with third-party properties, launches by land developers, builders and developers in several cities',
			image: houseColor,
		},
		{
			name: t['Good Business'],
			content:
				'Receive customers who have already negotiated price and payment method and are ready to close the deal',
			image: dealColor,
		},
	]

	const [fullCommission, setFullCommission] = useState(30.0)
	const [yourCommission, setYourCommission] = useState(21.0)

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
				<Grid
					container
					spacing={2}
					sx={{
						paddingRight: { xs: 5, sm: 5, md: 10, xl: 10, lg: 10 },
						marginTop: 2,
					}}
				>
					<Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
						<BrokerHelp
							name={t['Help revolutionize the real estate market']}
							content="By connecting to the network, you will have the most modern and
            technological real estate platform in Brazil. The only platform that
            offers the 100% digital buying and selling process, from scheduling a
            visit, proposal to the public deed, without leaving home. Eliminating
            bureaucracy and providing more time so you can dedicate yourself to what
            matters, the customer"
							fieldItem={false}
							buttonName={t['Be a partner']}
							handleLoginOpen={handleLoginOpen}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
						<BrokerHelpContent imageSrc={brokerHelpImage} />
					</Grid>
				</Grid>
				<Box
					sx={{
						// backgroundColor: "#F9F9FB",
						paddingTop: { xs: 0, sm: 0, md: 10, lg: 10, xl: 10 },
						// paddingBottom: 5,
						// clipPath:
						//   "polygon(0 0, 13% 5%, 30% 10%, 53% 13%, 71% 10%, 100% 0, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%)",
						// clipPath: "circle(15em at 10% 40%)",
					}}
				>
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						sx={{
							mt: { xs: 8, sm: 8, md: 0, xl: 0, lg: 0 },
							pb: 5,
							px: { xs: '2.5vh', sm: '2.5vh' },
						}}
					>
						<Typography
							variant="p"
							sx={{
								fontSize: {
									sm: '32px',
									xs: '32px',
									md: '40px',
									lg: '40px',
									xl: '40px',
								},
								pb: { xs: 2, sm: 2, md: 5, lg: 5, xl: 5 },
								color: '#1A1859',
								fontWeight: '800',
							}}
						>
							{t['Become a super broker']}
						</Typography>
					</Grid>
					<Container
						maxWidth="xl"
						sx={{ mt: { xs: 8, sm: 8, md: 0, xl: 0, lg: 0 } }}
					>
						<Grid
							container
							spacing={2}

							// className="shape-circle"
						>
							<Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
								<BecomeBrokerContent />
							</Grid>
							<Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
								<BecomeBroker
									contentData={becomeBrokerData}
									buttonVisible={true}
									languageName={myValue.toString()}
								/>
							</Grid>
						</Grid>
					</Container>
				</Box>
				<Box
					sx={{
						paddingTop: { xs: 5, sm: 5, md: 10, lg: 10, xl: 10 },
						paddingBottom: 10,

						backgroundImage: {
							xs: `url(${mobileGray.src})`,
							sm: `url(${mobileGray.src})`,
							md: `url("data:image/svg+xml,${svgString}")`,
							lg: `url("data:image/svg+xml,${svgString}")`,
							xl: `url("data:image/svg+xml,${svgString}")`,
						},
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				>
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						sx={{
							//   mt: { xs: 8, sm: 8, md: 0, xl: 0, lg: 0 },
							pb: { xs: 1, sm: 1, md: 5, xl: 5, lg: 5 },
							px: { xs: '2.5vh', sm: '2.5vh' },
						}}
					>
						<Typography
							variant="p"
							sx={{
								fontSize: {
									sm: '32px',
									xs: '32px',
									md: '40px',
									lg: '40px',
									xl: '40px',
								},
								pb: { xs: 0, sm: 0, md: 3, xl: 3, lg: 3 },
								mt: { xs: 0, sm: 0, md: 10, xl: 11, lg: 10 },
								color: '#1A1859',
								fontWeight: '800',
							}}
						>
							{t['Maximize your results']}
						</Typography>
					</Grid>
					<Container
						maxWidth="lg"
						sx={{
							//   mt: { xs: 8, sm: 8, md: 0, xl: 0, lg: 0 },
							background: '#FFFFFF',
							borderRadius: '6px',
							boxShadow: '0px 8px 24px rgba(3, 2, 39, 0.07)',
							py: 2.5,
						}}
					>
						<Grid
							container
							spacing={2}

							// className="shape-circle"
						>
							<Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
								<CalulateComission
									setFullCommission={setFullCommission}
									setYourCommission={setYourCommission}
									languageName={myValue.toString()}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
								<ComissionResult
									fullCommission={fullCommission}
									yourCommission={yourCommission}
									languageName={myValue.toString()}
								/>
							</Grid>
						</Grid>
					</Container>

					<Container
						maxWidth="xl"
						sx={{ marginTop: { xs: 5, sm: 5, md: 15, xl: 15, lg: 15 } }}
					>
						<Grid container spacing={2}>
							{facilitiesData?.map((data, index) => (
								<Grid
									key={index}
									item
									xs={12}
									sm={12}
									md={6}
									xl={4}
									lg={4}
								>
									<BrokerFacilities data={data} />
								</Grid>
							))}
						</Grid>
					</Container>
					<Container maxWidth="xl" sx={{ marginTop: 5 }}>
						<Grid container spacing={2}>
							{facilitiesBottomData?.map((data, index) => (
								<Grid
									key={index}
									item
									xs={12}
									sm={12}
									md={6}
									xl={6}
									lg={6}
								>
									<BrokerFacilities data={data} />
								</Grid>
							))}
						</Grid>
					</Container>
				</Box>
				<Footer />
			</main>
		</div>
	)
}

export async function getServerSideProps(context) {
	const cookies = context.req.cookies['language']
	return {
		props: {
			language: cookies,
		},
	}
}

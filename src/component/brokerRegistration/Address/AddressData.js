import {
	Box,
	Button,
	FormControl,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import BaseOutlinedZipInput from '../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput'
import BaseTextField from '../../reuseable/baseTextField/BaseTextField'
import { Controller } from 'react-hook-form'
import BaseAutocomplete from '../../reuseable/baseAutocomplete/BaseAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { findStateData } from '../../../redux/state/actions'

function AddressData({
	handleBack,
	handleNext,
	control,
	errors,
	allValues,
	setValue,
}) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(findStateData())
	}, [dispatch])

	const allStateData = useSelector((state) => state.state.stateData)

	useEffect(() => {
		setValue('state', allStateData[0])
	}, [allStateData, setValue])

	return (
		<Box sx={{ mt: 4 }}>
			<Grid
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="center"
			>
				<Typography
					variant="p"
					sx={{
						color: '#1A1859',
						fontSize: '24px',
						fontWeight: '700',
						lineHeight: '29px',
					}}
				>
					Address
				</Typography>
			</Grid>

			<Grid container spacing={1} sx={{ mt: 2 }}>
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ mb: 1 }}
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
							Zip Code<span style={{ color: '#E63333' }}>*</span>
						</Typography>
					</Grid>
					{/* <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            type="number"
            value={value}
            onChange={(e) => handleValidation(e)}
            error={!valid && value.length > 0 ? true : false}
            required={true}
            // placeholder="Social Name"
            variant="outlined"
            sx={{ mb: 1 }}
          /> */}
					<FormControl variant="outlined" sx={{ width: '100%', mb: 1 }}>
						<Controller
							name="zip_code"
							control={control}
							render={({ field }) => (
								<BaseOutlinedZipInput
									placeholder={'Zip Code'}
									size={'small'}
									onChange={(e) => {
										field.onChange(e.target.value)
									}}
									name={'zip_code'}
									value={field.value}
									// error={errors.cpf_number ? true : false}
								/>
							)}
						/>
						<Typography
							variant="inherit"
							color="textSecondary"
							sx={{ color: '#b91c1c' }}
						>
							{errors.zip_code?.message}
						</Typography>
					</FormControl>
				</Grid>
			</Grid>

			<Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
				<Grid item xs={12} sm={12} md={8}>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ mb: 1 }}
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
							Address<span style={{ color: '#E63333' }}>*</span>
						</Typography>
					</Grid>
					<Controller
						name="address"
						control={control}
						defaultValue={''}
						render={({ field }) => (
							<BaseTextField
								size={'small'}
								placeholder={'Address'}
								onChange={(e) => {
									field.onChange(e.target.value)
								}}
								name={'address'}
								value={field.value}
							/>
						)}
					/>
					<Typography
						variant="inherit"
						color="textSecondary"
						sx={{ color: '#b91c1c' }}
					>
						{errors.address?.message}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={4} sx={{ mb: 1 }}>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ mb: 1 }}
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
							Number<span style={{ color: '#E63333' }}>*</span>
						</Typography>
					</Grid>
					<Controller
						name="number"
						control={control}
						defaultValue={''}
						render={({ field }) => (
							<BaseTextField
								size={'small'}
								placeholder={'Number'}
								onChange={(e) => {
									field.onChange(e.target.value)
								}}
								name={'number'}
								type={'number'}
								value={field.value}
							/>
						)}
					/>
					<Typography
						variant="inherit"
						color="textSecondary"
						sx={{ color: '#b91c1c' }}
					>
						{errors.number?.message}
					</Typography>
				</Grid>
			</Grid>

			<Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ mb: 1 }}
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
							Neighbourhood<span style={{ color: '#E63333' }}>*</span>
						</Typography>
					</Grid>
					<Controller
						name="neighbourhood"
						control={control}
						defaultValue={''}
						render={({ field }) => (
							<BaseTextField
								size={'small'}
								placeholder={'Neighbourhood'}
								onChange={(e) => {
									field.onChange(e.target.value)
								}}
								name={'neighbourhood'}
								value={field.value}
							/>
						)}
					/>
					<Typography
						variant="inherit"
						color="textSecondary"
						sx={{ color: '#b91c1c' }}
					>
						{errors.neighbourhood?.message}
					</Typography>
				</Grid>
			</Grid>

			<Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ mb: 1 }}
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
							Add-on
							<span
								style={{
									color: '#7C7C99',
									fontSize: '14px',
									fontWeight: '400',
								}}
							>
								(optional)
							</span>
						</Typography>
					</Grid>
					<Controller
						name="add_on"
						control={control}
						defaultValue={''}
						render={({ field }) => (
							<BaseTextField
								size={'small'}
								placeholder={'Add on'}
								onChange={(e) => {
									field.onChange(e.target.value)
								}}
								name={'add_on'}
								value={field.value}
							/>
						)}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
				<Grid item xs={12} sm={12} md={6}>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ mb: 1 }}
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
							State<span style={{ color: '#E63333' }}>*</span>
						</Typography>
					</Grid>
					<Controller
						name="state"
						control={control}
						defaultValue={allStateData[0] || {}}
						render={({ field }) => (
							<BaseAutocomplete
								//   sx={{ margin: "0.6vh 0" }}
								options={allStateData || []}
								getOptionLabel={(option) => option.name || ''}
								isOptionEqualToValue={(option, value) =>
									option.id === value.id
								}
								size={'small'}
								placeholder={'State'}
								onChange={(e, v, r, d) => field.onChange(v)}
								value={field.value}
							/>
						)}
					/>
					<Typography
						variant="inherit"
						color="textSecondary"
						sx={{ color: '#b91c1c' }}
					>
						{errors.state?.message}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Grid
						container
						direction="row"
						justifyContent="flex-start"
						alignItems="flex-start"
						sx={{ mb: 1 }}
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
							City<span style={{ color: '#E63333' }}>*</span>
						</Typography>
					</Grid>
					<Controller
						name="city"
						control={control}
						defaultValue={''}
						render={({ field }) => (
							<BaseTextField
								size={'small'}
								placeholder={'City'}
								onChange={(e) => {
									field.onChange(e.target.value)
								}}
								name={'city'}
								value={field.value}
							/>
						)}
					/>
					<Typography
						variant="inherit"
						color="textSecondary"
						sx={{ color: '#b91c1c' }}
					>
						{errors.city?.message}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	)
}

export default AddressData

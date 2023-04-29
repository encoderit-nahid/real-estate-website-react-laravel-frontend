import * as Types from './types'

const InitialState = {
	ContactDetailsData: {},
	loading: false,
}

const ContractDetailsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.CONTACT_DETAILS_REQUEST:
			return {
				ContactDetailsData: {},
				loading: true,
			}

		case Types.CONTACT_DETAILS_SUCCESS:
			return {
				ContactDetailsData: action.payload,
				loading: false,
			}

		case Types.CONTACT_DETAILS_SIGNATURE_CREATE:
			const afterAddSignature = [
				action.payload,
				...state?.ContactDetailsData?.signatures,
			]

			return {
				ContactDetailsData: {
					...state.ContactDetailsData,
					signatures: afterAddSignature,
				},
			}

		case Types.CONTACT_DETAILS_FAILED:
			return {
				ContactDetailsData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default ContractDetailsReducer

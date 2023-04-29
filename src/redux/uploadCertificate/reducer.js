import * as Types from './types'

const InitialState = {
	uploadCertificateData: {},
	loading: false,
}

const UploadCertificateReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.UPLOAD_CERTIFICATE_REQUEST:
			return {
				uploadCertificateData: {},
				loading: true,
			}

		case Types.UPLOAD_CERTIFICATE_SUCCESS:
			return {
				uploadCertificateData: action.payload,
				loading: false,
			}

		case Types.UPLOAD_CERTIFICATE_FAILED:
			return {
				uploadCertificateData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default UploadCertificateReducer

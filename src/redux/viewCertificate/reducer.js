import * as Types from "./types";

const InitialState = {
  viewCertificateData: {},
  loading: false,
};

const ViewCertificateReducer = (state = InitialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case Types.VIEW_CERTIFICATE_REQUEST:
      return {
        viewCertificateData: {},
        loading: true,
      };

    case Types.VIEW_CERTIFICATE_SUCCESS:
      return {
        viewCertificateData: action.payload,
        loading: false,
      };

    case Types.VIEW_CERTIFICATE_FAILED:
      return {
        viewCertificateData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default ViewCertificateReducer;

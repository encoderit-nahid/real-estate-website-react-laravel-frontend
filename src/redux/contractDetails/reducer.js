import * as Types from "./types";

const InitialState = {
  ContactDetailsData: {},
  loading: false,
};

const ContractDetailsReducer = (state = InitialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case Types.CONTACT_DETAILS_REQUEST:
      return {
        ContactDetailsData: {},
        loading: true,
      };

    case Types.CONTACT_DETAILS_SUCCESS:
      return {
        ContactDetailsData: action.payload,
        loading: false,
      };

    case Types.CONTACT_DETAILS_SIGNATURE_CREATE:
      console.log("action", action.payload);
      const afterAddSignature = [
        action.payload,
        ...state?.ContactDetailsData?.signatures,
      ];
      console.log({ afterAddSignature });
      return {
        ContactDetailsData: {
          ...state.ContactDetailsData,
          signatures: afterAddSignature,
        },
      };

    case Types.CONTACT_DETAILS_FAILED:
      return {
        ContactDetailsData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default ContractDetailsReducer;

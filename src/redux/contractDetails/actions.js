import {
  contractDetailsApi,
  contractSignApi,
  createSignatureApi,
} from "../../api";
import * as Types from "./types";

const contactDetailsRequest = (data) => {
  return {
    type: Types.CONTACT_DETAILS_REQUEST,
  };
};

const contactDetailsSuccess = (data) => {
  return {
    type: Types.CONTACT_DETAILS_SUCCESS,
    payload: data,
  };
};

const contactDetailsFailed = (err) => {
  return {
    type: Types.CONTACT_DETAILS_FAILED,
    payload: err,
  };
};

const signatureCreate = (data) => {
  return {
    type: Types.CONTACT_DETAILS_SIGNATURE_CREATE,
    payload: data,
  };
};

const signatureUpdate = (data) => {
  return {
    type: Types.CONTACT_DETAILS_SIGNATURE_UPDATE,
    payload: data,
  };
};

// feature action
export const findContractDetailsData = (id) => async (dispatch) => {
  dispatch(contactDetailsRequest());

  const [error, response] = await contractDetailsApi(id);

  if (!error) {
    dispatch(contactDetailsSuccess(response?.data));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(contactDetailsFailed(errorMassage));
  }
};

//ADD

export const signatureAddData = (body) => async (dispatch) => {
  const [error, response] = await createSignatureApi(body);

  if (!error) {
    // dispatch(contactDetailsSuccess(response?.data));
    dispatch(signatureCreate(response?.data?.users));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
  }
};

export const signatureUpdateData = (body) => async (dispatch) => {
  const [error, resp] = await contractSignApi(body);
  if (!error) {
    dispatch(signatureUpdate(body));
  }

  // if (!error) {
  //   // dispatch(contactDetailsSuccess(response?.data));
  //   dispatch(signatureCreate(response?.data?.users));
  // } else {
  //   const errorMassage =
  //     error?.response?.data?.data || error?.response?.data?.status;
  //   // toast.error(errorMassage);
  // }
};

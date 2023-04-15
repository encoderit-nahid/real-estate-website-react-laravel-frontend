import { featuresApi, requireCertrificateApi } from "../../api";
import * as Types from "./types";

const requireCertificateRequest = (data) => {
  return {
    type: Types.REQUIRE_CERTIFICATE_REQUEST,
  };
};

const requireCertificateSuccess = (data) => {
  return {
    type: Types.REQUIRE_CERTIFICATE_SUCCESS,
    payload: data,
  };
};

const requireCertificateFailed = (err) => {
  return {
    type: Types.REQUIRE_CERTIFICATE_FAILED,
    payload: err,
  };
};

// require certificate action
export const findRequireCertificateData = (id) => async (dispatch) => {
  dispatch(requireCertificateRequest());
  const [error, response] = await requireCertrificateApi(id);
  if (!error) {
    dispatch(requireCertificateSuccess(response?.data?.require_certificate));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(requireCertificateFailed(errorMassage));
  }
};


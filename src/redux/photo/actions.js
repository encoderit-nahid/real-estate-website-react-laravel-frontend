import { photoTypeApi } from "../../api";
import * as Types from "./types";

const photoTypeRequest = (data) => {
  return {
    type: Types.PHOTO_TYPE_REQUEST,
  };
};

const photoTypeSuccess = (data) => {
  return {
    type: Types.PHOTO_TYPE_SUCCESS,
    payload: data,
  };
};

const photoTypeFailed = (err) => {
  return {
    type: Types.PHOTO_TYPE_FAILED,
    payload: err,
  };
};

//getPhotoTypeData
export const GetPhotoTypeData = () => async (dispatch) => {
  dispatch(photoTypeRequest());

  const [error, response] = await photoTypeApi();
  console.log({ response });

  if (!error) {
    console.log(response);
    dispatch(photoTypeSuccess(response?.data?.phototypes));
  } else {
    const errorMassage =
      error?.response?.data?.message || error?.response?.data?.status;
    dispatch(photoTypeFailed(errorMassage));
  }
};

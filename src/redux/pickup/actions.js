import {
  createPickupApi,
  getPickupApi,
  pickUpDeleteApi,
  PickupUpdateApi,
} from "../../api";
import * as Types from "./types";

const pickupRequest = (data) => {
  return {
    type: Types.PICKUP_REQUEST,
  };
};

const pickupSuccess = (data) => {
  return {
    type: Types.PICKUP_SUCCESS,
    payload: data,
  };
};

const pickupFailed = (err) => {
  return {
    type: Types.PICKUP_FAILED,
    payload: err,
  };
};

const pickupRemove = (id) => {
  return {
    type: Types.PICKUP_REMOVE,
    payload: id,
  };
};

export const pickupDelete = (id) => async (dispatch) => {
  const [error] = await pickUpDeleteApi(id);

  if (!error) {
    dispatch(pickupRemove(id));
    dispatch(pickAddressData());
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;

    dispatch(pickupFailed(errorMassage));
  }
};

export const pickupAddData = (body) => async (dispatch) => {
  const [error] = await createPickupApi(body);

  if (!error) {
    // dispatch(pickupAdd(body));
    dispatch(pickAddressData());
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(pickupFailed(errorMassage));
  }
};

export const pickupUpdateData = (body) => async (dispatch) => {
  const [error] = await PickupUpdateApi(body);

  if (!error) {
    // dispatch(pickupUpdate(body));
    dispatch(pickAddressData());
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;

    // toast.error(errorMassage);
    dispatch(pickupFailed(errorMassage));
  }
};

// order action
export const pickAddressData = () => async (dispatch) => {
  dispatch(pickupRequest());

  const [error, response] = await getPickupApi();

  if (!error) {
    dispatch(pickupSuccess(response?.data?.pickup_points));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(pickupFailed(errorMassage));
  }
};

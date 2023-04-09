import { featureCreateApi, featuresApi } from "../../api";
import * as Types from "./types";

const featureRequest = (data) => {
  return {
    type: Types.FEATURE_REQUEST,
  };
};



const featureSuccess = (data) => {
  return {
    type: Types.FEATURE_SUCCESS,
    payload: data,
  };
};

const featureFailed = (err) => {
  return {
    type: Types.FEATURE_FAILED,
    payload: err,
  };
};


const featureCreateLoading = () => {
  return {
    type: Types.FEATURE_CREATE_LOADING,
  };
};

const featureCreateSuccess = (data) => {
  console.log({data})
  return {
    type: Types.FEATURE_CREATE_SUCCESS,
    data: data
  };
}

const featureCreateFailed = (data) => {
  return {
    type: Types.FEATURE_CREATE_FAILED,
    data: data
  }
}

const groupByType = (propertyType) =>
  propertyType?.reduce((group, product) => {
    const { type } = product;
    group[type] = group[type] ?? [];
    group[type].push(product);
    return group;
  }, {});

// feature action
export const findFeatureData = () => async (dispatch) => {
  dispatch(featureRequest());

  const [error, response] = await featuresApi();
  console.log({ response });

  if (!error) {
    console.log(response);
    const requireData = groupByType(response?.data?.features);
    console.log({ requireData });
    dispatch(featureSuccess(requireData));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(featureFailed(errorMassage));
  }
};

//FEATURE_CREATE
export const featureDataCreate = (body) => async (dispatch) => {
  
  const [error,response] = await featureCreateApi(body)
  if(!error){
    dispatch(featureCreateSuccess(response?.data?.feature))
  }
  else{
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    dispatch(featureCreateFailed(errorMassage))
  }
}

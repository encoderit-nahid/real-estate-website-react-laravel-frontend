import axios from "axios";
import { _baseURL } from "../../consts";

const baseURL = `${_baseURL}/api`;

export const apiInstance = axios.create({
  baseURL: baseURL,
});
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, "", []].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

//login
export const loginApi = async (body) => {
  try {
    const responseToken = await apiInstance.post(`login`, body);
    return [false, responseToken];
  } catch (errorToken) {
    return [errorToken, null];
  }
};

//forgot_password
export const forgotPasswordApi = async (body) => {
  try {
    const response = await apiInstance.post(`/password/forgot`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//reset_password
export const resetPasswordApi = async (body) => {
  try {
    const responseReset = await apiInstance.post(`/password/reset`, body);
    return [false, responseReset];
  } catch (errorReset) {
    return [errorReset, null];
  }
};

//verify_token
export const verifyToken = async (body) => {
  try {
    const responseVerifyToken = await apiInstance.post(
      `/password/token/varify`,
      body
    );
    return [false, responseVerifyToken];
  } catch (errorVerifyToken) {
    return [errorVerifyToken, null];
  }
};

//register
export const registrationApi = async (body) => {
  try {
    const responseToken = await apiInstance.post(`register`, body);
    return [false, responseToken];
  } catch (errorToken) {
    return [errorToken, null];
  }
};

//user_details_with_token;
export const userDetailsApi = async () => {
  try {
    const response = await apiInstance.get(`auth-user`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//find_state
export const stateApi = async () => {
  try {
    const response = await apiInstance.get(`state`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//find_property_type
export const propertyTypeApi = async () => {
  try {
    const response = await apiInstance.get(`property/property-type`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//find_features
export const featuresApi = async (type) => {
  try {
    const response = await apiInstance.get(`feature/index`, {
      params: omitEmpties({
        type: type,
      }),
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//best_deals_state
export const bestDealsApi = async () => {
  try {
    const response = await apiInstance.get(`/property/best-deals`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//proposal_create
export const createProposalApi = async (body) => {
  try {
    const response = await apiInstance.post(`proposal/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//schedule_create
export const createScheduleApi = async (body) => {
  try {
    const response = await apiInstance.post(`schedule/create`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//get_projects
export const GetAllProjects = async (queryData) => {
  try {
    const response = await apiInstance.get(
      `project/index?page=${queryData.page || 1}&per_page=${
        queryData?.per_page || 9
      }`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//create_project
export const createProjectApi = async (body) => {
  try {
    const response = await apiInstance.post(`project/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//photo_type
export const photoTypeApi = async () => {
  try {
    const response = await apiInstance.get(`property/photo-type`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//property
export const getPropertyApi = async (queryData) => {
  try {
    const response = await apiInstance.get(`property/index`, {
      params: omitEmpties({
        ...queryData,
        status: queryData?.status,
        page: queryData?.page,
        per_page: queryData?.per_page,
        relevant_filter: queryData?.relevant_filter,
        ad_type: queryData?.ad_type,
        // proposal_status: query?.proposal_status,
      }),
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

// //project_property
// export const getProjectProperty = async (queryData) => {
//   try {
//     const response = await apiInstance.get(`property/index`, {
//       params: queryData,
//     });
//     return [false, response];
//   } catch (error) {
//     return [error, null];
//   }
// };

//property_status
export const propertyStatusApi = async (body) => {
  try {
    const response = await apiInstance.post(`property/status`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//include_proposal_create
export const proposalCreateApi = async (body) => {
  try {
    const response = await apiInstance.post(`proposal/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//getSingleProperty
export const getSinglePropertyApi = async (id) => {
  try {
    const response = await apiInstance.get(`property/show/${id}`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//create_new_feature
export const featureCreateApi = async (body) => {
  try {
    const response = await apiInstance.post(`feature/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//create_new_property
export const propertyCreateApi = async (body) => {
  try {
    const response = await apiInstance.post(`property/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//accept_proposal
export const proposalAcceptApi = async (body) => {
  try {
    const response = await apiInstance.post(`proposal/accept`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//refuse_proposal
export const proposalRefuseApi = async (id) => {
  try {
    const response = await apiInstance.delete(`proposal/delete/${id}`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//contract_upload
export const contractUploadApi = async (body) => {
  try {
    const response = await apiInstance.post(`contract/file/upload`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//contract_download
export const contractDownloadApi = async (id) => {
  try {
    const response = await apiInstance.get(`contract/download`, {
      params: {
        id: id,
      },
    });
    window.open(`${response?.data?.url}`, "_blank");
    console.log({ response });
    return [false, response];
  } catch (error) {
    console.log("contractDownloadApi", error.message, error);
    return [error, null];
  }
};

//contract_download
export const certificateDownloadApi = async (id, certificate_type_id) => {
  try {
    const response = await apiInstance.get(`contract/download`, {
      params: {
        id: id,
        certificate_type_id: certificate_type_id,
      },
    });
    window.open(`${response?.data?.url}`, "_blank");
    console.log({ response });
    return [false, response];
  } catch (error) {
    console.log("contractDownloadApi", error.message, error);
    return [error, null];
  }
};

//contract_details
export const contractDetailsApi = async (id) => {
  try {
    const response = await apiInstance.get(`contract/details`, {
      mode: "no-cors",
      params: {
        id: id,
      },
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//require_ceritificate_submit
export const certificateSubmitApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `contract/require-certificates-submit`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//signature_add
export const createSignatureApi = async (body) => {
  try {
    const response = await apiInstance.post(`contract/create/signature`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//getRequire_certificate
export const requireCertrificateApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/get-require-certificates?id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//certificate_upload_api
export const certificateUploadApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `contract/certificate/upload`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//getUpload_certificate
export const uploadCertrificateApi = async (id, type) => {
  try {
    const response = await apiInstance.get(
      `contract/get-uploaded-certificates`,
      {
        params: omitEmpties({
          id: id,
          type: type,
        }),
      }
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//certificate_validation
export const certificateValidationApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `/contract/certificate/validation`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//get_schedule
export const getScheduleApi = async () => {
  try {
    const response = await apiInstance.get(`/schedule/index`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//cancel_schedule
export const cancelScheduleApi = async (body) => {
  try {
    const response = await apiInstance.post(`/schedule/cancel`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//get_broker
export const getBrokerApi = async (query) => {
  try {
    const response = await apiInstance.get(`/users/index`, {
      params: query,
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//chnage_status_broker
export const changeBrokerStatusApi = async (body) => {
  try {
    const response = await apiInstance.post(`/users/status-update`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//delete_broker
export const deleteBrokerApi = async (id) => {
  try {
    const response = await apiInstance.delete(`users/delete/${id}`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//request_documents
export const requestDocumentsApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/check-certificate-validation?contract_id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//view_certificate
export const certificateViewApi = async (contract_id, certificate_type_id) => {
  try {
    const response = await apiInstance.get(
      `contract/certificate/view?contract_id=${contract_id}&certificate_type_id=${certificate_type_id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//certificate_validation
export const ContractCertificateValidationApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `/contract/certificate/validation`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//documnet_send
export const DocumentSentApi = async (body) => {
  try {
    const response = await apiInstance.post(`/contract/documents/send`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//final_submitted
export const contractSubmittedDataApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/submitted-data??contract_id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//proposal_count
export const proposalCountApi = async () => {
  try {
    const response = await apiInstance.get(`/proposal/count`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

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
export const featuresApi = async () => {
  try {
    const response = await apiInstance.get(`feature/index`);
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

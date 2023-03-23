import * as Types from "./types";

const InitialState = {
  pickupData: [],
  loading: false,
};

const PickupReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.PICKUP_REQUEST:
      return {
        pickupData: [],
        loading: true,
      };

    case Types.PICKUP_SUCCESS:
      return {
        pickupData: action.payload,
        loading: false,
      };
    case Types.PICKUP_ADD:
      return {
        pickupData: [action.payload, ...state.pickupData],
      };

    case Types.PICKUP_UPDATE:
      const pickupDetail = action.payload;
      const updateDetail = state.pickupData?.map((address) => {
        if (address.id === pickupDetail.id) {
          return pickupDetail;
        }
        return address;
      });
      return {
        pickupData: { pickupData: updateDetail },
      };

    case Types.PICKUP_REMOVE:
      return {
        pickupData: state.pickupData.filter((address) => {
          return address.id !== action.payload;
        }),
      };

    case Types.PICKUP_FAILED:
      return {
        countData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default PickupReducer;

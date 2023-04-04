import { combineReducers } from "redux";
import StateReducer from "./state/reducer";
import PropertyTypeReducer from "./propertyType/reducer";
import FeatureReducer from "./features/reducer";
import ProjectReducer from "./projects/reducer";
import PhotoTypeReducer from "./photo/reducer";

const RootReducer = combineReducers({
  state: StateReducer,
  propertyType: PropertyTypeReducer,
  feature: FeatureReducer,
  project: ProjectReducer,
  photoType: PhotoTypeReducer,
  // Auth: AuthReducer,
  // userDetails: UserReducer,
  // Orders: OrderReducer,
  // counts: CountReducer,
  // singleOrder: SingleOrderReducer,
  // update: UpdateProfileReducer,
  // changePassword: ChangePasswordReducer,
  // statistics: StatisticsReducer,
  // forgotPassword: ForgotPasswordReducer,
  // pickup: PickupReducer,
  // createOrder: CreateOrderReducer,
  // scanOrder: ScanReducer,
});

export default RootReducer;

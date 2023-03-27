import { combineReducers } from "redux";
import StateReducer from "./state/reducer";
import PropertyTypeReducer from "./propertyType/reducer";

const RootReducer = combineReducers({
  state: StateReducer,
  propertyType: PropertyTypeReducer,
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

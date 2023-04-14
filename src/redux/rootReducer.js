import { combineReducers } from "redux";
import StateReducer from "./state/reducer";
import PropertyTypeReducer from "./propertyType/reducer";
import FeatureReducer from "./features/reducer";
import ProjectReducer from "./projects/reducer";
import PhotoTypeReducer from "./photo/reducer";
import PropertyReducer from "./property/reducer";
import ProjectPropertyReducer from "./projectProperty/reducer";
import PropertyStatusReducer from "./propertyStatus/reducer";
import singlePropertyReducer from "./singleProperty/reducer";
import ButtonReducer from "./featureWithoutGroup/reducer";
import PropertyAcceptReducer from "./proposalAccept/reducer";
import ProposalRefuseReducer from "./proposalRefuse/reducer";
import CertificateReducer from "./certificates/reducer";
import ContractDetailsReducer from "./contractDetails/reducer";

const RootReducer = combineReducers({
  state: StateReducer,
  propertyType: PropertyTypeReducer,
  feature: FeatureReducer,
  project: ProjectReducer,
  photoType: PhotoTypeReducer,
  property: PropertyReducer,
  propertyStatus: PropertyStatusReducer,
  singleProperty: singlePropertyReducer,
  featureButton: ButtonReducer,
  propertyAccept: PropertyAcceptReducer,
  proposalRefuse: ProposalRefuseReducer,
  certificate: CertificateReducer,
  contractDetails: ContractDetailsReducer,

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

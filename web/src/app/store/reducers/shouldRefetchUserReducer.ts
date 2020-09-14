import { SET_REFETCH_USER } from "../actions";
import { ShouldRefetchUserActionType } from "../types/actions";
import { ShouldRefetchUserState } from "../types/reducers";

const initialState: ShouldRefetchUserState = {
  shouldRefetchUser: false,
};

const shouldRefetchUserReducer = (
  state = initialState,
  action: ShouldRefetchUserActionType
): ShouldRefetchUserState => {
  switch (action.type) {
    case SET_REFETCH_USER:
      return {
        ...state,
        shouldRefetchUser: action.payload,
      };

    default:
      return state;
  }
};

export default shouldRefetchUserReducer;

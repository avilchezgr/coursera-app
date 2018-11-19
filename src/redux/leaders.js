import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
	leadersLoading: true,
	errmess: null,
	leaders : []
}, action) => {
	switch(action.type){
		case ActionTypes.LEADERS_LOADING:
			return {...state,leadersLoading: true, errmess: null, leaders: []};
		case ActionTypes.LEADERS_FAILED:
			return {...state, leadersLoading: false, errmess: action.payload, leaders: []};
		case ActionTypes.ADD_LEADERS:
			return {...state, leadersLoading: false, errmess: null, leaders: action.payload};
		default:
			return state;
	}
} 
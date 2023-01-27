import axios from 'axios';

//types
export const Join_User = "Join_User";

//action
export function joinUser(dataToSubmit) {
  const request = axios.post('/api/users/register', dataToSubmit).then(response => response.data)
  
  return {
    type: Join_User,
    payload: request
  }
}


//reducer
export default function (state={}, action) {
  switch(action.type) {
    case Join_User:
      return {...state, join: action.payload} 
      break;
    default: 
      return state; 
  }
}
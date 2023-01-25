const SET_USER_TYPE= 'user/SET' as const;

type UserAction = 
    | ReturnType<typeof set>

type UserState = {
    type : String
    id : String
}

export const set = (user: UserState) => ({
    type : SET_USER_TYPE,
    payload : user
});

const initialState: UserState = {
    type : '',
    id : ''
}

export default function userReducer(state: UserState = initialState, action: UserAction) {
    switch (action.type){
        case SET_USER_TYPE:
            return state = action.payload
        default : 
            return state
    }
}

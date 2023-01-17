const SET_USER_TYPE= 'user/SET' as const;

export const set = (type : String) => ({
    type : SET_USER_TYPE,
    payload : type
});

type UserAction = 
    | ReturnType<typeof set>

type UserState = {
    type : String;
}

const initialState: UserState = {
    type : ''
}

export default function userReducer(state: UserState = initialState, action: UserAction) {
    switch (action.type){
        case SET_USER_TYPE:
            return { type : action.payload}
        default : 
            return state
    }
}

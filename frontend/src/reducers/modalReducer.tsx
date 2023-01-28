const SET_MODAL= 'modal/SET' as const;

type ModalAction = 
    | ReturnType<typeof set>

type ModalState = {
    state : string,
    cashe1 : string,
    cashe2 : string
}

export const set = (state: ModalState) => ({
    type : SET_MODAL,
    payload : state
});

const initialState: ModalState = {
    state : '',
    cashe1 : '',
    cashe2 : ''
}

export default function modalReducer(state: ModalState = initialState, action: ModalAction) {
    switch (action.type){
        case SET_MODAL:
            return state = action.payload
        default : 
            return state
    }
}

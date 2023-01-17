/* action start */

const SET_PAGE= 'header/SET' as const;
const RESET_PAGE = 'header/RESET' as const;

export const reset = () => ({type : RESET_PAGE});
export const set = (page : String) => ({
    type : SET_PAGE,
    payload : page
});

type HeaderAction = 
    | ReturnType<typeof reset>
    | ReturnType<typeof set>

/* action end */

/* reducer start */

type PageState = {
    page : String;
}

const initialState: PageState = {
    page : 'home'
}

export default function headerReducer(state: PageState = initialState, action: HeaderAction) {
    switch (action.type){
        case SET_PAGE:
            return { page : action.payload}
        case RESET_PAGE:
            return { page : 'home'}
        default : 
            return state
    }
}

/* reducer end */
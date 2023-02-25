const SET_COMPANY= 'company/SET' as const;


type CompanyAction = 
    | ReturnType<typeof set>


type CompanyState = {

    cname : String
}    

export const set = (company: CompanyState) => ({
    type : SET_COMPANY,
    payload : company
});

const initialState: CompanyState = {
    
    cname : ''

}

export default function userReducer(state: CompanyState = initialState, action: CompanyAction) {
    switch (action.type){
        case SET_COMPANY:
            return state = action.payload
        default : 
            return state
    }
};
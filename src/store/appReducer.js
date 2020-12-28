
const intialState = {
    selectedOption: null,
    clauses: []
}

const appReducer = (state= intialState, action) =>{
    if(!action || !action.type) return;
    const type = action.type;

    switch(type){
        case "SELECTED_OPTION":
            return {
                ...state,
                selectedOption: action.value
            }
        case "UPDATE_SQL_CLAUSE":
            if(action.value.index == null){
                return {
                    ...state,
                    clauses: []
                }
            }

            const newClauses = [...state.clauses];
            if(newClauses.length > 0){
                newClauses.splice(action.value.index, 1, action.value.clause);
            } else {
                newClauses.push(action.value.clause);
            }
            
            return {
                ...state,
                clauses: newClauses
            }
        default:
            return {...state}

    }
}

export default appReducer;
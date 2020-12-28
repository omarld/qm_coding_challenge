
const intialState = {
    selectedOption: null,
    clauses: []
}

const appReducer = (state= intialState, action) =>{
    if(!action || !action.type) return;
    const type = action.type;

    switch(type){
        case "SELECTED_OPTION":
            console.log("OPTION value selected is from redux: " + action.value);
            return {
                ...state,
                selectedOption: action.value
            }
        case "UPDATE_SQL_CLAUSE":
            console.log("SQL Update value selected is from redux: " + action.value);
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
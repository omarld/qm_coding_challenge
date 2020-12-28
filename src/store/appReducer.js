
const intialState = {
    selectedOption: null,
    clause: []
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
            const newClause = [...state.clause];
            if(newClause.length > 0){
                newClause.splice(action.value.index, 1, action.value);
            } else {
                newClause.push(action.value);
            }
            
            return {
                ...state,
                clause: newClause
            }
        default:
            return {...state}

    }
}

export default appReducer;

const intialState = {
    selectedOption: null
}

const appReducer = (state= intialState, action) =>{
    if(!action || !action.type) return;
    const type = action.type;

    switch(type){
        case "SELECTED_OPTION":
            console.log("value selected is: " + action.value);
            return {
                ...state,
                selectedOption: action.value
            }
        default:
            return {...state}

    }
}

export default appReducer;
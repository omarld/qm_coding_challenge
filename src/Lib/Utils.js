
const OPERATOR_TO_STRING = {
    "equals": "=",
    "contains": "LIKE",
    "starts with": "=^",
    "in list": "=%",
    "between": "BETWEEN",
    "greater than": ">",
    "less than": "<"
}

const formatSql = (clause) =>{
    if(!clause || !Array.isArray(clause)) return;

    let counter = 0;
    let sqlString = 
`
SELECT id, user_email, user_first_name, user_last_name, screen_width, screen_height,
visits, page_response, domain, path 
FROM session`;

    clause.forEach((item, index) =>{
        if(item){
            const and = counter === 0 ? 'WHERE' : 'AND';
            const postConditionValue = item.type === "number" ? item.postConditionInputValue : `"${item.postConditionInputValue}"`
            counter++;
            sqlString += `
${and} ${item.selectedPredicate} ${OPERATOR_TO_STRING[item.selectedOperator.value]} ${postConditionValue}`
        }
    });

    return sqlString;
}

export default {
    formatSql
}

const OPERATOR_TO_STRING = {
    "equals": "=",
    "contains": "LIKE",
    "starts with": "LIKE",
    "in list": "IN",
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
            let postConditionValue = null;

            let preConditionValue = null;
            if(item.selectedOperator && item.selectedOperator.preCondition){
                preConditionValue = item.type === "number" ? `${item.preConditionInputValue} AND` : `'${item.preConditionInputValue}' AND`
            }

            switch(item.selectedOperator.value){
                case 'contains':
                    postConditionValue = `"%${item.postConditionInputValue}%"`;
                    break;
                case 'starts with':
                    postConditionValue = `"${item.postConditionInputValue}%"`;
                    break;
                case 'in list':
                        const inList = item.postConditionInputValue.split(' ');
                        postConditionValue = '(';

                        inList.forEach((str, index) =>{

                            //prefer this approach rather than nesting if conditions. Easier to read
                            if(str && str !== '' && item.type === "number"){
                                postConditionValue += (index === inList.length -1) ? `${str}`: `${str},`;   
                            } else if(str && str !== ''){
                                postConditionValue += (index === inList.length -1) ? `'${str}'`: `'${str}',`
                            }
                        });
                        postConditionValue += ')';
                        break;
                default:
                    postConditionValue = item.type === "number" ? item.postConditionInputValue : `'${item.postConditionInputValue}'`;
            }
            
            sqlString += `
${and} ${item.selectedPredicate} ${OPERATOR_TO_STRING[item.selectedOperator.value]} ${preConditionValue || ''} ${postConditionValue}`;
            
            counter++;
        }
    });

    return sqlString;
}

export default {
    formatSql
}
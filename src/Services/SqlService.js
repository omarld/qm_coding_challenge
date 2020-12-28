import {PREDICATES , PREDICATE_TYPES} from 'Lib/Constants';

const TypeToOperatorMapping = {};

TypeToOperatorMapping[PREDICATE_TYPES.STRING] = [
    { key: "1", value: "equals" },
    { key: "2", value: "contains" },
    { key: "3", value: "starts with" },
    { key: "4", value: "in list" }
];

TypeToOperatorMapping[PREDICATE_TYPES.NUMERIC] = [
    { key: "num1", value: "equals" },
    { key: "num2", value: "between", preCondition: "is", postCondition: "and" },
    { key: "num3", value: "greater than" },
    { key: "num3", value: "less than" },
    { key: "num4", value: "in list" }
];


export const getAllConditions = () => {
    const conditions = [];
    for(const [key, predicate] of Object.entries(PREDICATES)){
        conditions.push(
            {
                key: key,
                value: predicate.value,
                type: predicate.type,
                operators: TypeToOperatorMapping[predicate.type],
                placeHolder:  predicate.placeHolder
            }
        );
    }

    return conditions;
}

export const getConditionByKey = (key) => {
    const predicate = PREDICATES[key];

    return {
        key: key,
        value: predicate.value,
        type: predicate.type,
        operators: TypeToOperatorMapping[predicate.type],
        placeHolder:  predicate.placeHolder
    };
}

import {PREDICATES , PREDICATE_TYPES} from 'Lib/Constants';

const TypeToOperatorMapping = {};

TypeToOperatorMapping[PREDICATE_TYPES.STRING] = [
    { key: 1, value: "equals", preCondition: "is", postCondition: "and"  },
    { key: 2, value: "contains" },
    { key: 3, value: "starts with" },
    { key: 4, value: "in list" }
];

TypeToOperatorMapping[PREDICATE_TYPES.NUMERIC] = [
    { key: 1, value: "equals" },
    { key: 2, value: "between", preCondition: "is", postCondition: "and" },
    { key: 3, value: "greater than" },
    { key: 3, value: "less than" },
    { key: 4, value: "in list" }
];


export const getAllConditions = () => {
    const conditions = [];
    for(const [key, predicate] of Object.entries(PREDICATES)){
        conditions.push(
            {
                key: key,
                value: predicate.value,
                type: predicate.type,
                operators: TypeToOperatorMapping[predicate.type]
            }
        );
    }

    return conditions;
}

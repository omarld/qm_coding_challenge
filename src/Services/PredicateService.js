import Constants from 'Lib/Constants';

const TypeToOperatorMapping = {};

TypeToOperatorMapping[Constants.PREDICATE_TYPES.STRING] = [
    { value: "equals" },
    { value: "contains" },
    { value: "starts with" },
    { value: "in list" }
];

TypeToOperatorMapping[Constants.PREDICATE_TYPES.NUMERIC] = [
    { value: "equals" },
    { value: "between", preCondition: "is", postCondition: "and" },
    { value: "greater than" },
    { value: "less than" },
    { value: "in list" }
];

export const PREDICATE_TYPES = {
    STRING: "string",
    NUMERIC: "numeric"
}

export const PREDICATES = {
    USER_EMAIL: { 
        value: "User Email",
        type: PREDICATE_TYPES.STRING
    },
    SCREEN_WIDTH: { 
        value: "Screen Width", 
        type: PREDICATE_TYPES.NUMERIC 
    },
    SCREEN_HEIGHT: {
        value: "Screen Height",
        type: PREDICATE_TYPES.NUMERIC
    },
    NUMBER_OF_VISITS: {
        value: "# of Visits",
        type: PREDICATE_TYPES.NUMERIC
    },
    FIRST_NAME: {
        value: "First",
        type: PREDICATE_TYPES.STRING
    },
    LAST_NAME: { 
        value: "Last Name",
        type: PREDICATE_TYPES.STRING
    },
    NAME: {
        value: "Name",
        type: PREDICATE_TYPES.STRING
    },
    PAGE_RESPONSE_TIME: {
        value: "Page Response Time (ms)",
        type: PREDICATE_TYPES.NUMERIC
    },
    DOMAIN: {
        value: "Domain",
        type: PREDICATE_TYPES.STRING
    },
    PAGE_PATH: { 
        value: "Page Path",
        type: PREDICATE_TYPES.STRING
    }
}
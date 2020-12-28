export const PREDICATE_TYPES = {
    STRING: "text",
    NUMERIC: "number"
}

export const PREDICATES = {}
PREDICATES['domain'] = { 
        value: "Domain",
        type: PREDICATE_TYPES.STRING
    };
PREDICATES['screen_width'] = { 
        value: "Screen Width", 
        type: PREDICATE_TYPES.NUMERIC 
    };
PREDICATES['screen_height'] = {
        value: "Screen Height",
        type: PREDICATE_TYPES.NUMERIC
    };
PREDICATES['visits'] = {
        value: "# of Visits",
        type: PREDICATE_TYPES.NUMERIC
    };
PREDICATES['user_first_name'] = {
        value: "First Name",
        type: PREDICATE_TYPES.STRING
    };
PREDICATES['user_last_name'] = { 
        value: "Last Name",
        type: PREDICATE_TYPES.STRING
    };

PREDICATES['page_response'] = {
        value: "Page Response Time (ms)",
        type: PREDICATE_TYPES.NUMERIC
    };

PREDICATES['user_email'] = {
        value: "User Email",
        type: PREDICATE_TYPES.STRING
    };

PREDICATES['path'] = { 
        value: "Page Path",
        type: PREDICATE_TYPES.STRING
    };

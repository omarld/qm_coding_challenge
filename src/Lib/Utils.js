
const formatSql = (clause) =>{
    if(!clause || !Array.isArray(clause)) return;

    let sqlString = 
`
select * from session where
`;
    clause.forEach((item, index) =>{
        if(item){
            console.log(item);
            sqlString += ` soemthing
            `
        }
    });

    return sqlString;
}

export default {
    formatSql
}
var jwt = require('jsonwebtoken')

let genToken = ((name:string, query:string) => {
    let x = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: [
            name,
            query,
        ]
    }, 'secret');
    return x;
})

export default genToken;
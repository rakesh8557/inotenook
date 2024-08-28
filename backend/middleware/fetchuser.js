const jwt = require('jsonwebtoken');
const JWT_SECRET = 'RAKESH_FIRST_JWT_TOKEN'

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');

    if(!token) {
        res.status(401).send({error: "Unathorized Access"});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user_id = data.user_id
        next();    
    } catch (error) {
        res.status(401).send({error: "Unathorized Access"});
    }
    
}

module.exports = fetchuser;
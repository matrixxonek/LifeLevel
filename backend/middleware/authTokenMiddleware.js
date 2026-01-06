import jwt from 'jsonwebtoken';

const authTokenMiddleware = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: "Brak dostępu: nie znaleziono tokena" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token jest nieważny lub wygasł" });
        }

        req.user = decoded;
        next();
    });
};

export default authTokenMiddleware;
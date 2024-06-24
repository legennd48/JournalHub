import { verifyToken, isTokenBlacklisted } from '../utils/jwt';

export const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'Access Denied' });
    }

    const blacklisted = await isTokenBlacklisted(token);

    if (blacklisted) {
        return res.status(401).send({ message: 'Token already logged out' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).send({ message: 'Invalid Token' });
    }

    req.user = decoded;
    next();
};

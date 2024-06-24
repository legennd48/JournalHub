import jwt from 'jsonwebtoken';
import redisClient from './redis';

const SECRET_KEY = process.env.SECRET_KEY || 'This Is A Secret';

export const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '24h' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};

export const blacklistToken = (token, expiresIn) => {
    return redisClient.setex(`black_${token}`, 'blacklisted', expiresIn);
};

export const isTokenBlacklisted = async (token) => {
    if (await redisClient.get(`black_${token}`) === 'blacklisted') {
        return true;
    };
    return false;
    };
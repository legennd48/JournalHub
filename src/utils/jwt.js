import jwt from 'jsonwebtoken';
import redisClient from './redis';

const SECRET_KEY = process.env.SECRET_KEY || 'This Is A Secret';

/**
 * Generates a JWT token.
 * @function
 * @param {string} userId - The user ID to include in the token payload.
 * @returns {string} The generated JWT token.
 */
export const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '24h' });
};

/**
 * Verifies a JWT token.
 * @function
 * @param {string} token - The JWT token to verify.
 * @returns {Object|null} The decoded token if valid, otherwise null.
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};

/**
 * Blacklists a JWT token by storing it in Redis.
 * @function
 * @param {string} token - The JWT token to blacklist.
 * @param {number} expiresIn - The time in seconds until the token expires.
 * @returns {Promise<void>} A promise that resolves when the token is blacklisted.
 */
export const blacklistToken = (token, expiresIn) => {
    return redisClient.setex(`black_${token}`, 'blacklisted', expiresIn);
};

/**
 * Checks if a JWT token is blacklisted.
 * @function
 * @param {string} token - The JWT token to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the token is blacklisted, otherwise false.
 */
export const isTokenBlacklisted = async (token) => {
    if (await redisClient.get(`black_${token}`) === 'blacklisted') {
        return true;
    }
    return false;
};

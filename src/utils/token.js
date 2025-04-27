import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.user_id, 
            username: user.username,
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET || process.env.SESSION_SECRET,
        {
            expiresIn: '30d',
        }
    );
};
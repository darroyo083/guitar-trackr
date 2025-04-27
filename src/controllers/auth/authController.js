import User from '../../models/users.js';
import { hashPassword, comparePassword } from '../../utils/bcrypt.js';
import { generateToken } from '../../utils/token.js';
import { Op } from 'sequelize';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ 
            where: { 
                [Op.or]: [{ username }, { email }] 
            } 
        });
        
        if (userExists) {
            return res.status(400).json({ error: 'Usuario o email ya registrado' });
        }
        
        // Hash de la contraseña
        const hashedPassword = await hashPassword(password);
        
        // Crear el usuario
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'user'
        });
        
        if (user) {
            res.status(201).json({
                id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user),
            });
        } else {
            res.status(400).json({ error: 'Datos de usuario inválidos' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }
        
        // Verificar contraseña
        const passwordMatch = await comparePassword(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }
        
        res.json({
            id: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
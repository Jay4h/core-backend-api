const User = require('../models/user.model');
const { generateTokens } = require('../utils/jwt.util');

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 * @access  Public
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const user = new User({
            name,
            email,
            passwordHash: password // Will be hashed by pre-save hook
        });

        await user.save();

        // Generate tokens
        const tokens = generateTokens(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                },
                ...tokens
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /auth/login
 * @desc    Login user
 * @access  Public
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user and include password field
        const user = await User.findOne({ email }).select('+passwordHash');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate tokens
        const tokens = generateTokens(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                },
                ...tokens
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /auth/logout
 * @desc    Logout user (token invalidation handled client-side)
 * @access  Private
 */
const logout = async (req, res, next) => {
    try {
        // In a stateless JWT system, logout is primarily handled client-side
        // by removing the token. For enhanced security, implement token blacklisting
        // or use refresh token rotation.

        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout
};

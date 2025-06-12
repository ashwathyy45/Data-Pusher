const { body, validationResult, header } = require('express-validator');

exports.validateRegistration = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

exports.validateIncomingDataHeaders = [
    header('CL_X_TOKEN').notEmpty().withMessage('CL_X_TOKEN header required'),
    header('CL_X_EVENT_ID').notEmpty().withMessage('CL_X_EVENT_ID header required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

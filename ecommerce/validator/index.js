const { check, validationResult } = require('express-validator');
exports.userSignupValidator = [
	check('name', 'Name must not be empty').notEmpty(),
	check('name', 'Name must have atleast 2 characters').isLength({ min: 2 }),
	check('email', 'Your email must not be empty').not().isEmpty(),
	check('email', 'Email must be between 3 to 32 characters').isLength({ min: 3, max: 32 }),
	check('email').matches(/.+\@.+\..+/).withMessage('Email must contain @'),
	check('password', 'Your password must not be empty').notEmpty(),
	check('password').isLength({ min: 6 }).withMessage('Password must contain atleast 6 characters'),
	check('password').matches(/\d/).withMessage('Password must contain a number')
];

exports.userSignupValidation = (req, res, next) => {
	const errors = validationResult(req);
	console.log(req.body);

	if (errors && Array.isArray(errors.errors) && errors.errors.length > 0) {
		console.log('errors :', errors);
		let error = errors.errors[0].msg;
		return res.status(400).json({ error });
	}
	next();
};

const express = require('express');
const router = express.Router();

// Importation des controllers
const { userController, authentificationController } = require('../controllers/');

// Importation des middlewares
const { encryptPwd, jwtAuth, isUserUnique } = require('../middlewares');

/**
 * USER
 */

// Importation de la validation par JOI
const validate = require('../validation/validator');
const createSchema = require('../validation/schemas/userCreateSchema');
const loginSchema = require('../validation/schemas/userLoginSchema');
const updateSchema = require('../validation/schemas/userUpdateSchema');

// post /login pour se connecter
/**
 * POST /login
 * @tags 1.User - everything about user
 * @summary to get connected with email and password
 * @param {UserLogin} request.body.required
 * @return {string} 200 - success response - application/json
 * @example response - 200 - success response token example
 * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4NDc0Mzk0MCwiZXhwIjoxNjg1MzQ4NzQwfQ.NGFUkwgq2OTIyvGdQOvHN4tq5U9JTAUdBqPZAL94n4Y"
 * @return {ValidationError} 400 - bad input data
 */
router.post(
    '/login',
    [validate('body', loginSchema)],
    authentificationController.login
);

// post /signup pour créer un compte
/**
 * POST /signup
 * @tags 1.User - everything about user
 * @summary to create an account with email, password, firstname and lastname
 * @param {User} request.body.required
 * @return {string} 200 - success response - application/json
 * @example response - 200 - success response token example
 * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4NDc0Mzk0MCwiZXhwIjoxNjg1MzQ4NzQwfQ.NGFUkwgq2OTIyvGdQOvHN4tq5U9JTAUdBqPZAL94n4Y"
 * @return {ValidationError} 400 - bad input data
 */
router.post(
    '/signup',
    [validate('body', createSchema), isUserUnique, encryptPwd],
    authentificationController.signup
);

// Middleware vérifiant le token JWT afin d'authoriser
// une connexion aux routes et désignant le user signed in (req.userId)
router.use(jwtAuth);

router
    .route('/user')
    /**
     * GET /user
     * @tags 1.User - everything about user
     * @summary to get user informations
     * @security bearerAuth
     * @return {string} 200 - success response - application/json
     * @example response - 200 - success response token example
     * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4NDc0Mzk0MCwiZXhwIjoxNjg1MzQ4NzQwfQ.NGFUkwgq2OTIyvGdQOvHN4tq5U9JTAUdBqPZAL94n4Y"
     * @return {ValidationError} 400 - bad input data
     */
    .get(userController.getInfo)
    /**
     * PATCH /user
     * @tags 1.User - everything about user
     * @summary to modify user informations
     * @param {User} request.body.required
     * @return {string} 200 - success response - application/json
     * @example response - 200 - success response token example
     * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4NDc0Mzk0MCwiZXhwIjoxNjg1MzQ4NzQwfQ.NGFUkwgq2OTIyvGdQOvHN4tq5U9JTAUdBqPZAL94n4Y"
     * @return {ValidationError} 400 - bad input data
     */
    .patch(
        [validate('body', updateSchema), isUserUnique, encryptPwd],
        userController.modify
    )
    /**
     * DELETE /user
     * @tags 1.User - everything about user
     * @summary to delete user account
     * @return {ValidationError} 400 - bad input data
     */
    .delete(userController.delete);

module.exports = router;

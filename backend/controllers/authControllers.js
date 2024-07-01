const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({
        where: {
          username: username
        }
      });

    if (!foundUser ) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    
    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "role": foundUser.role
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })
    const {password:storedPassword, ...user} = {...foundUser.dataValues}

    // Send accessToken containing username and roles 
    res.json({ accessToken ,user})
}

// create a register controlller for creating new user
// @desc Register
// @route POST /auth
// @access Public
const register = async (req, res) => {
    const { username, password ,email} = req.body
    console.log(req.body);
    // user bycrypt

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // use sequelize to check if user already exist
    const foundUser = await User.findOne({
        where: {
          username: username
        }
      });

    if (foundUser) {
        return res.status(409).json({ message: 'User already exists' })
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        password: hashedPassword,
        email
    })

    // save to the dp

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

        

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.status(200).json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    register,
    logout
}
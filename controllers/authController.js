const db = require('../models/index')
const helper = require('../utils/index')
const { promisify } = require("util");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const client = require('../redisConnect')
dotenv.config({ path: './.env' })



//Register A User/Admin/Supervisor
exports.SignUp = async (req, res) => {
    try {
        const { name, email,number, password, roles } = req.body;
        console.log(req.body)
        const hash = await helper.hashPassword(password)
        const user = await db.Users.create({ name, email,number, password: hash, roles })
        return res.status(200).send({ user })
    } catch (err) {
        res.status(400).json({
            message: 'Failed'
        })
    }

}
//Login a User/Admin/Supervisor
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({
                message: "Enter the password and email"
            })
        }
        const useremail = await db.Users.findOne({ where: { email } })
        if (!useremail) {
            return res.status(400).json({
                message: "Email not exists"
            })
        }
        if (!(await helper.comparePassword(password, useremail.dataValues.password))) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }
        const { token, refreshtoken } = helper.createToken(useremail)

        console.log("token,refreshtoken", token, refreshtoken)

        res.status(200).send({
            status: "Login Successfully",
            token: token,
            refreshtoken: refreshtoken,
            useremail
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


exports.VerifyRefreshToken = async (req, res , next) => {
    try {
        const token = req.body.token;
        if (token === null) {
            return res.status(400).json({
                status: false,
                message: "Invalid Request",
            })
        }

        let decoded = await promisify(jwt.verify)(token, process.env.JWT_REFERESHKEY);
        console.log("DECODED VALUE", decoded)
        const freshUser = await db.Users.findByPk(decoded.id);
        req.user = freshUser.dataValues;

        // Verify if token is in store or not
        client.get(decoded.id.toString(), (err, data) => {
            if (err) throw err;

            if (data === null) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid Request"
                })
            }

            if (JSON.parse(data).token !== token) {
                return res.status(400).json({
                    status: false,
                    message: "Your token is not same as token stored in"
                })
            }
            next()
          
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: false,
            message: "Your session is not valid",
            data: err

        })
    }

}

exports.generateRefreshToken = (id, email) => {
    console.log("ID EMAIL IN GENERATE REFRESH", id, email)
    const refreshtoken = jwt.sign({ id, email }, process.env.JWT_REFERESHKEY, { expiresIn: process.env.JWT_REFERESHTIME })
    console.log("REFRESH TOKEN", refreshtoken)

    client.get(id.toString(), (err, data) => {
        if (err) throw err;
        client.set(id.toString(), JSON.stringify({ token: refreshtoken }));
    })



    return refreshtoken;
}

exports.logoutFunction = async (req, res) => {
    try {
        const email = req.user.email;
        const id = req.user.id;
        const token = req.token;
        console.log("EMAIL", email)
        console.log('BLTOKEN LOGOUT' + id.toString())

        await client.del(id.toString());

        // Blacklist token
        await client.set('BLTOKEN' + id.toString(), token);


        return res.status(200).json({
            status: "Logout Success"
        })
    } catch (err) {
        return res.status(500).json({
            err: err
        })
    }

}

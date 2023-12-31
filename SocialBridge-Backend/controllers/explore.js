// importing database model to interact with database and give the info of all the users 
const User = require("../models/User")
require("dotenv").config()

exports.explore = async (req, res) => {

    const Data = await User.find({_id: { $ne: process.env.ADMIN_ID }})

    res.status(200).json({
        success: true,
        Data: Data
    })

}

const feedbackschema = require('../../validator/publicvalidator')
const db = require('../../config/database');
const axios = require('axios')
const Feedback = db.feedback
const mail = require("./FeedbackSubmitted")

const FeedBack = async(req, res)=>{
    let success = false;

    let { error } = feedbackschema.validate(req.body)
    if(error) return res.status(201).json({success: success, Error: error})

    let info = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    }

    // Phone Number Validation
    const response = await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=a57a7fd14f294b7ea5d0329727c35260&phone=${info.phone}`)
    if(!response.data.valid) return res.status(422).json({success: success, Error: "Invalid phone number"})

    try {
        await Feedback.create(info)
        success = true
        console.log(info.email);
        await mail(info.email, info.name)
        res.status(201).json({success: success, Message: "Submitted!"})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = FeedBack
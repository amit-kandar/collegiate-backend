const feedback = require('../functions/public/Feedback')

const Feedback = async(req, res) => {
    await feedback(req, res)
}

module.exports = {Feedback}
const router = require("express").Router();
const public = require('../Controller/publiccontroller');

router.post("/feedback", public.Feedback);

module.exports = router
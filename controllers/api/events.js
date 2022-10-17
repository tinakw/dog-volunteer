const Event = require('../../models/Event');

const get = async (req, res) => {
    const events = await Event.find({});
    res.json(events)
}


module.exports = {
    get
}
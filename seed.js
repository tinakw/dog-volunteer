const User = require('./models/User');
const Event = require('./models/Event');
const Message = require('./models/Message');
const mongoose = require('mongoose');


async function seed() {
    try {
        // const user = await User.create({
        //     first_name: 'Tina',
        //     last_name: 'Worden',
        //     email: 'tinaworden@gmail.com',
        //     password: 'hello123'
        // });

        // const event = await Event.create({
        //     title: 'Meet and Greet',
        //     description: 'Meet your local friendly dogs',
        //     date: Date.now()
        // })

        // const message = await Message.create({
        //     user: mongoose.Types.ObjectId('634c56689bb4f85f6f48ea38'),
        //     body: 'Hello WOrld 123',
        //     event: mongoose.Types.ObjectId('634c564bbb30d26b52f9cf66'),
        // });
        const messages = await Message.find({}).populate({path: 'user', select: 'first_name last_name'})
        console.log(messages);
    } catch (err) {
        console.log(err);
    }

    console.log('eerything good')
}

module.exports = seed;
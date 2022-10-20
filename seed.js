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

        await Event.create({
            title: 'November Meet and Greet',
            description: 'Meet your local friendly dogs',
            date: "November 22nd 2022",
            img: "SDPFrGate.jpg"
        })

        await Event.create({
            title: 'Weekend Fall Clean-up and Fundraiser',
            description: 'JOIN US! Light grounds clean up and maintenance, pickup litter and other needed tasks. Equipment will be provided. Please bring work gloves. 100% of your tax deductible＄donation goes toward the purchase of bags and maintenance supplies to care for this ✶special✶ park.',
            date: "Saturday & Sunday, November 19-20, 2022 @10a-4p",
            img: "Barkleyfriends.jpg"
        })

        await Event.create({
            title: 'Puppy Play Date',
            description: 'Meet in the puppy yard. Puppies 12months and under are invited for unstructured play to safely develop social skills with other puppies. Volunteers will be on hand to offer puppy advice.',
            date: "Sunday, November 27, 2022 @10a-12p",
            img: "doodleMeetUp.jpg"
        })

        await Event.create({
            title: 'Yappy Hour @ New District Brewing',
            description: 'Address: 2709 S Oakland St Arlington, VA A special day for the pups and their hoomans. Yappy Hour takes place from 12 to 3 p.m. every Sunday.',
            date: "Sundays, Now - Dec 18, 2022. From: 12:00 PM to 03:00 PM",
            img: "chase.jpg"
        })

        await Event.create({
            title: 'Meet and Greet',
            description: 'Meet your local friendly dogs',
            date: "Sunday, December 4, 2022 @10a-12p",
            img: " LetsPlay.jpg"
        })

        await Event.create({
            title: 'Early Risers Meet and Greet',
            description: 'Pups and their hoomans of all ages are invited for unstructured play.',
            date: "Sunday, December 11, 2022 @ 8a-11a",
            img: "OxfordStDogRun.jpg"
        })

        await Event.create({
            title: 'December Meet and Greet',
            description: 'Meet your local friendly dogs',
            date: 'Sunday, December 11 2022',
            img: "ShallotRottie.jpg"
        })

        await Event.create({
            title: 'Mid-Week Meet and Greet',
            description: 'Pups and their hoomans are invited for unstructured play.',
            date: "Wednesdays, Now - December 4, 2022 @ 3p-5p",
            img: "ThirstyDog.jpg"
        })

        // const message = await Message.create({
        //     user: mongoose.Types.ObjectId('634c56689bb4f85f6f48ea38'),
        //     body: 'Hello WOrld 123',
        //     event: mongoose.Types.ObjectId('634c564bbb30d26b52f9cf66'),
        // });
        const messages = await Message.find({}).populate({ path: 'user', select: 'first_name last_name' })
        console.log(messages);
    } catch (err) {
        console.log(err);
    }

    console.log('eerything good')
}

module.exports = seed;
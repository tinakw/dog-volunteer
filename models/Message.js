const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const User = require('./User');
const Event = require('./Event')


const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User },
  body: { type: String, required: true},
  event: { type: Schema.Types.ObjectId, ref: Event },
}, {
  timestamps: true,
  
});



module.exports = mongoose.model('Message', messageSchema);
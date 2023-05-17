const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: Date, default: Date.now },
  isEdited: { type: Boolean, default: false },
});

const RoomSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  msg_log: [MessageSchema]
});
// TODO: add picture

// virtual for user's URL
RoomSchema.virtual('url').get(function () {
  return `/room/${this._id}`;
});

module.exports = mongoose.model('Room', RoomSchema);
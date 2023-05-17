const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
});
// TODO: add picture

// virtual for user's full name
UserSchema.virtual('name').get(function () {
  return (this.first_name && this.family_name) ?
    `${this.first_name}, ${this.family_name}` :
    '';
});

// virtual for user's URL
UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);
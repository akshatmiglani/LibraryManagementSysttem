const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowingSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model('Borrowing', borrowingSchema);

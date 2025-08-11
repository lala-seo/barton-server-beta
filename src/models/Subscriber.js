const mongoose = require('mongoose');
const crypto = require('crypto');

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'] },
  firstName: String,
  lastName: String,
  interests: [{ type: String, enum: ['photos', 'press', 'videos', 'general'] }],
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtuals
subscriberSchema.virtual('fullName').get(function () {
  return this.firstName && this.lastName ? `${this.firstName} ${this.lastName}` : this.firstName || this.email;
});


module.exports = mongoose.model('Subscriber', subscriberSchema);

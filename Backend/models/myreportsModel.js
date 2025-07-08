import mongoose from 'mongoose';

const myReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileUrl: {
    type: String,
    required: false, // Now optional
  },
  fileName: {
    type: String,
    required: false, // Now optional
  },
  symptoms: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

export default mongoose.model('MyReport', myReportSchema);

import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const deptDegreeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    deptDegree: {
      type: ObjectId,
      ref: 'Department',
      required: true,
    },
  },
  { timestamps: true }
);

export const Degree = mongoose.model('Degree', deptDegreeSchema);

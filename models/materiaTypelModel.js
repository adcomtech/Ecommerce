import mongoose from 'mongoose';
import slugify from 'slugify';

const materialTypeSchema = new mongoose.Schema(
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
      index: true,
    },
  },

  { timestamps: true }
);

materialTypeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const MaterialType = mongoose.model('MaterialType', materialTypeSchema);

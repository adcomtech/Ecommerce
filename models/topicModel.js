import mongoose from 'mongoose';
import slugify from 'slugify';
const { ObjectId } = mongoose.Schema;

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      text: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    summary: {
      type: String,
      required: true,
      maxlength: 100,
      text: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },

    department: {
      type: ObjectId,
      ref: 'Department',
    },

    category: [
      {
        type: ObjectId,
        ref: 'MaterialType',
      },
    ],

    numTopic: Number,

    numTopicSold: {
      type: Number,
      default: 0,
    },

    // images: {
    //   type: Array,
    // },

    isSold: {
      type: String,
      enum: ['Yes', 'No'],
    },

    fileExt: {
      type: String,
      enum: ['Pdf', 'Doc', 'Docx'],
    },

    level: {
      type: String,
      enum: ['Postgraduate', 'Undergraduate'],
    },

    degree: {
      type: String,
      enum: ['M.SC', 'B.SC', 'HND', 'ND', 'NCE'],
    },

    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

topicSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

export const Topic = mongoose.model('Topic', topicSchema);

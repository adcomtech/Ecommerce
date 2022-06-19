import slugify from 'slugify';
import { Topic } from '../models/topicModel.js';

export const createTopic = async (req, res) => {
  try {
    const newTopic = await Topic.create(req.body);
    res.json(newTopic);
  } catch (err) {
    console.log(err);
    // res.status(400).send('Create Topic Failed');
    res.status(400).json({
      err: err.message,
    });
  }
};

export const getTopic = async (req, res) => {
  try {
    let topic = await Topic.findOne({ slug: req.params.slug })
      .populate('department')
      .populate('category')
      .exec();
    res.json(topic);
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
  }
};

export const getAllTopic = async (req, res) => {
  let topics = await Topic.find({})
    .limit(parseInt(req.params.count))
    .populate('department')
    .populate('category')
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(topics);
};

export const deleteTopic = async (req, res) => {
  try {
    const deletedTopic = await Topic.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deletedTopic);
  } catch (err) {
    console.log(err);
    return res.staus(400).send('Topic delete failed');
  }
};

export const updateTopic = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Topic.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log('Topic UPDATE ERROR ----> ', err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// Without Pagination
export const listByFields = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, limit } = req.body;
    const topics = await Topic.find({})
      .populate('department')
      .populate('category')
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(topics);
  } catch (err) {
    console.log(err);
  }
};

// WITH PAGINATION
export const list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 10; // 3

    const topics = await Topic.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('department')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(topics);
  } catch (err) {
    console.log(err);
  }
};

export const topicsCount = async (req, res) => {
  let total = await Topic.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

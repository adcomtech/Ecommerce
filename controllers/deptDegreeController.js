import slugify from 'slugify';
import { Degree } from '../models/deptDegreeModel.js';

export const createDeptDegree = async (req, res) => {
  try {
    const { name, deptDegree } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    const newDegree = await new Degree({
      name,
      deptDegree,
      slug: slugify(name),
    }).save();
    res.json(newDegree);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create Degree failed');
  }
};

export const getAllDeptDegree = async (req, res) => {
  const degrees = await Degree.find({}).sort({ createdAt: -1 }).exec();
  res.json(degrees);
};
export const getDeptDegree = async (req, res) => {
  const degree = await Degree.findOne({ slug: req.params.slug }).exec();
  res.json(degree);
};

export const updateDeptDegree = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedDegree = await Degree.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updatedDegree);
  } catch (err) {
    console.log(err);
    res.status(400).send('Degree update failed');
  }
};

export const deleteDeptDegree = async (req, res) => {
  try {
    const deletedDegree = await Degree.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedDegree);
  } catch (err) {
    res.status(400).send('Degree delete failed');
  }
};

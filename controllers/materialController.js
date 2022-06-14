import slugify from 'slugify';
import { MaterialType } from '../models/materiaTypelModel.js';

export const createMaterial = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save();
    // res.json(category);
    res.json(await new MaterialType({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send('Create Material failed');
  }
};

export const getAllMaterial = async (req, res) =>
  res.json(await MaterialType.find({}).sort({ createdAt: -1 }).exec());

export const getMaterial = async (req, res) => {
  const material = await MaterialType.findOne({ slug: req.params.slug }).exec();
  res.json(material);
};

export const updateMaterial = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedMaterial = await MaterialType.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updatedMaterial);
  } catch (err) {
    res.status(400).send('Create update failed');
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const deletedMaterial = await MaterialType.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedMaterial);
  } catch (err) {
    res.status(400).send('Material delete failed');
  }
};

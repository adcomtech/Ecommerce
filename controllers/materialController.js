import { MaterialType } from '../models/materiaTypelModel.js';

export const createMaterial = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save()
    const newMaterial = await new MaterialType({ name }).save();

    res.json(newMaterial);
  } catch (err) {
    // console.log(err);
    res.status(400).send('Create Material failed');
  }
};

export const getAllMaterial = async (req, res) => {
  const materials = await MaterialType.find({}).sort({ createdAt: -1 }).exec();
  res.json(materials);
};

export const getMaterial = async (req, res) => {
  const material = await MaterialType.findOne({ slug: req.params.slug }).exec();
  res.json(material);
};

export const updateMaterial = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedMaterial = await MaterialType.findOneAndUpdate(
      { slug: req.params.slug },
      { name },
      { new: true }
    );
    res.json(updatedMaterial);
  } catch (err) {
    res.status(400).send('Material update failed');
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

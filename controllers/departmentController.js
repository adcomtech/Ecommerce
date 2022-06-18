import slugify from 'slugify';
import { Department } from '../models/departmentModel.js';

export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({ name, slug: slugify(name) }).save()
    const newDepartment = await new Department({
      name,
      slug: slugify(name),
    }).save();

    res.json(newDepartment);
  } catch (err) {
    // console.log(err);
    res.status(400).send('Create Department failed');
  }
};

export const getAllDepartment = async (req, res) => {
  const departments = await Department.find({}).sort({ createdAt: -1 }).exec();
  res.json(departments);
};

export const getDepartment = async (req, res) => {
  const department = await Department.findOne({ slug: req.params.slug }).exec();
  res.json(department);
};

export const updateDpartment = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedDpartment = await Department.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    res.json(updatedDpartment);
  } catch (err) {
    console.log(err);
    res.status(400).send('Department update failed');
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findOneAndDelete({
      slug: req.params.slug,
    });

    res.json(deletedDepartment);
  } catch (err) {
    res.status(400).send('Department delete failed');
  }
};

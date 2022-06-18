import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createTopic } from '../../../httpRequestFun/topicHttpRequst';
import { getDepartments } from '../../../httpRequestFun/departmentHttp';
import { getMaterials } from '../../../httpRequestFun/materialHttp';

const initialState = {
  title: '',
  description: '',
  summary: '',
  price: '',
  departments: [],
  department: '',
  categories: [],
  category: '',
  isSold: '',
  numTopic: '',
  numTopicSold: '',
  images: [],
  fileExt: '',
  degrees: ['M.SC', 'B.SC', 'HND', 'ND', 'NCE'],
  degree: '',
  level: '',
};

const CreateTopic = () => {
  const [values, setValues] = useState(initialState);
  // const [degreeOptions, setDegreeOptions] = useState([]);
  // const [showDegree, setShowDegree] = useState(false);

  // redux
  const { user } = useSelector(state => ({ ...state }));

  // destructure
  const {
    title,
    description,
    summary,
    price,
    categories,
    departments,
    numTopic,
    degrees,
  } = values;

  // Reading List Dept and Material Type
  const getValues = (dept, mat) =>
    setValues({ ...values, departments: dept.data, categories: mat.data });

  // Loading the Created Departments
  useEffect(() => {
    const loadDeptAndMat = async () => {
      try {
        const dept = await getDepartments();
        const mat = await getMaterials();
        getValues(dept, mat);
        // setValues({ ...values, departments: dept.data, categories: mat.data });
      } catch (err) {
        console.log(err);
      }
      // getDepartments().then(dept =>
      //   setValues({ ...values, departments: dept.data })
      // );
      // getMaterials().then(mat =>
      //   setValues({ ...values, categories: mat.data })
      // );
    };

    loadDeptAndMat();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    createTopic(values, user.token)
      .then(res => {
        console.log(res);
        toast.success(`The Topic is Created Successfully`);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  // This ensures that Department Degree get displayed when a particular one selected
  // const handleCatagoryChange = e => {
  //   e.preventDefault();
  //   console.log('CLICKED CATEGORY', e.target.value);
  //   setValues({
  //     ...values,
  //     deptDegree: e.target.value,
  //     department: e.target.value,
  //   });
  //   getDeptDegrees(e.target.value).then(res => {
  //     console.log('SUB OPTIONS ON CATGORY CLICK', res);
  //     setDegreeOptions(res.data);
  //   });

  //   setShowDegree(true);
  // };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-10'>
          <h4>Create Topic Page</h4>
          <hr />
          {/* {JSON.stringify(values.degrees)} */}
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                name='title'
                className='form-control'
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                type='text'
                name='description'
                className='form-control'
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='summary'>Summary</label>
              <input
                type='text'
                name='summary'
                className='form-control'
                value={summary}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                name='price'
                className='form-control'
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='isSold'>Topic Sold</label>
              <select
                name='isSold'
                className='form-control'
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='numTopic'>Number of Topic</label>
              <input
                type='number'
                name='numTopic'
                className='form-control'
                value={numTopic}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='department'>Department</label>
              <select
                name='department'
                className='form-control'
                onChange={handleChange}
              >
                <option>Please select</option>
                {departments.length > 0 &&
                  departments.map(department => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='category'>Categories</label>
              <select
                name='category'
                className='form-control'
                onChange={handleChange}
              >
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='level'>Level</label>
              <select
                name='level'
                className='form-control'
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value='Postgraduate'>Postgraduate</option>
                <option value='Undergraduate'>Undergraduate</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='fileExt'>File Format</label>
              <select
                name='fileExt'
                className='form-control'
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value='Pdf'>Pdf</option>
                <option value='Doc'>Doc</option>
                <option value='Docx'>Docx</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='degree'>Degree</label>
              <select
                name='degree'
                className='form-control'
                placeholder='Please select'
                onChange={handleChange}
              >
                <option>Please select</option>
                {degrees.length > 0 &&
                  degrees.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </select>
            </div>

            <button className='btn btn-outline-info'>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTopic;

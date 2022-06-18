import React from 'react';

const TopicUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  categories,
  departments,
}) => {
  // destructure
  const {
    title,
    description,
    summary,
    price,
    isSold,
    numTopic,
    level,
    degrees,
    degree,
    fileExts,
    fileExt,
  } = values;

  return (
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
          value={isSold === 'Yes' ? 'Yes' : 'No'}
        >
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
          <option> Please Select</option>
          {departments.length > 0 &&
            departments.map(dept => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
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
          <option>Please Select</option>
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
          value={level === 'Postgraduate' ? 'Postgraduate' : 'Undergraduate'}
        >
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
          value={fileExt}
        >
          {fileExts.map(f => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor='degree'>Degree</label>
        <select
          name='degree'
          className='form-control'
          placeholder='Please select'
          onChange={handleChange}
          value={degree}
        >
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
  );
};

export default TopicUpdateForm;

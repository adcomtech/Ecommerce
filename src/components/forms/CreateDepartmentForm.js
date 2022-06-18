import React from 'react';

const CreateDepartmentForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={e => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className='btn'>Save</button>
      </div>
    </form>
  );
};

export default CreateDepartmentForm;

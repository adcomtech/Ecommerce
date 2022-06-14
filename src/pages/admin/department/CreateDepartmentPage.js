import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
} from '../../../httpRequestFun/departmentHttp';
import CreateDepartmentForm from '../../../components/forms/CreateDepartmentForm';

const CreateDepartmentPage = () => {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  // A state for Search and filtering implementation
  const [searchQuery, setSearchQuery] = useState('');

  // Loading the Created Departments
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = () =>
    getDepartments().then(dept => setDepartments(dept.data));

  // Handle the form submit to create department
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createDepartment({ name }, user.token)
      .then(res => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        // Loading Department after been created so as to refresh the page
        loadDepartments();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  // Handle the Removal of Department from the Frontend and Backend
  const handleRemove = async slug => {
    // To Bring default confirm box
    if (window.confirm('Delete?')) {
      setLoading(true);
      deleteDepartment(slug, user.token)
        .then(res => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);

          // Loading Department after been created so as to refresh the page
          loadDepartments();
        })
        .catch(err => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // Handling Search and Filtering Functionality
  const handleSearchChange = e => {
    e.preventDefault();
    setSearchQuery(e.target.value.toLowerCase());
  };

  // step 4
  const searched = searchQuery => dept =>
    dept.name.toLowerCase().includes(searchQuery);

  return (
    <div className='container-fluid'>
      {/* <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div> */}
      <div className='col'>
        {loading ? (
          <h4 className='text-danger'>Loading..</h4>
        ) : (
          <h4>Create Department</h4>
        )}

        <CreateDepartmentForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
        />

        {/* step 2 */}
        <input
          type='search'
          placeholder='Filter Departments'
          value={searchQuery}
          onChange={handleSearchChange}
          className='form-control'
        />

        <hr />
        {/* Displaying All Department with Filter Functionality */}
        {departments.filter(searched(searchQuery)).map(dept => (
          <div className='alert alert-secondary' key={dept._id}>
            {dept.name}
            <span onClick={() => handleRemove(dept.slug)} className='btn'>
              Delete
            </span>
            <Link to={`/admin/department/${dept.slug}`}>
              <span className='btn'>Edit</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateDepartmentPage;

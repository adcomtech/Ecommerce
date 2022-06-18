import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getDepartments } from '../../../httpRequestFun/departmentHttp';
import CreateDepartmentForm from '../../../components/forms/CreateDepartmentForm';
import {
  createDeptDegree,
  deleteDeptDegree,
  getDeptDegrees,
} from '../../../httpRequestFun/deptDegreeHttp';
import SearchForm from '../../../components/forms/SearchForm';

const CreateDeptDegree = () => {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [deptDegrees, setDeptDegrees] = useState([]);
  const [deptDegree, setDeptDegree] = useState('');

  // A state for Search and filtering implementation
  const [searchQuery, setSearchQuery] = useState('');

  // Loading the Created Departments
  useEffect(() => {
    loadDepartments();
    loadDeptDegrees();
  }, []);

  const loadDepartments = async () => {
    const dept = await getDepartments();
    setDepartments(dept.data);
  };

  const loadDeptDegrees = () =>
    getDeptDegrees().then(degree => setDeptDegrees(degree.data));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    createDeptDegree({ name, deptDegree: deptDegree }, user.token)
      .then(res => {
        // console.log(res)

        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadDeptDegrees();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  // Function that deletes the Degrees
  const handleRemove = async slug => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm(`Are you Sure you Want to Delete this ${slug}`)) {
      setLoading(true);
      deleteDeptDegree(slug, user.token)
        .then(res => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadDeptDegrees();
        })
        .catch(err => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = searchQuery => degree =>
    degree.name.toLowerCase().includes(searchQuery);

  return (
    <div className='row'>
      <div className='col'>
        {loading ? (
          <h4 className='text-danger'>Loading..</h4>
        ) : (
          <h4>Create Department By Degree</h4>
        )}

        {/* step 2 */}
        <select
          name='department'
          className='form-control'
          onChange={e => setDeptDegree(e.target.value)}
        >
          <option>Please select</option>
          {departments.length > 0 &&
            departments.map(dept => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
        </select>
      </div>

      {/* Form For Creating Degree */}
      <CreateDepartmentForm
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
      />

      <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* step 5 */}
      {deptDegrees.filter(searched(searchQuery)).map(degree => (
        <div className='alert alert-secondary' key={degree._id}>
          {degree.name}
          <span
            onClick={() => handleRemove(degree.slug)}
            className='btn btn-sm float-right'
          >
            Delete
          </span>
          <Link to={`/admin/degree/${degree.slug}`}>
            <span className='btn btn-sm float-right'>Edit</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CreateDeptDegree;

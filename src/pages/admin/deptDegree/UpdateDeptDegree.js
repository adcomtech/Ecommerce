import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getDepartments } from '../../../httpRequestFun/departmentHttp';
import CreateDepartmentForm from '../../../components/forms/CreateDepartmentForm';
import {
  getDeptDegree,
  updateDeptDegree,
} from '../../../httpRequestFun/deptDegreeHttp';

const UpdateDeptDegree = () => {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [deptDegree, setDeptDegree] = useState('');

  // Accessing Url Parametr
  const params = useParams();
  const slug = params.slug;

  // Redirecting
  const navigate = useNavigate();

  // Loading the Created Departments
  useEffect(() => {
    loadDepartments();
    loadDeptDegree();
  }, []);

  const loadDepartments = async () => {
    const dept = await getDepartments();
    setDepartments(dept.data);
  };

  const loadDeptDegree = () =>
    getDeptDegree(slug).then(degree => {
      setName(degree.data.name);
      setDeptDegree(degree.data.deptDegree);
    });

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateDeptDegree(slug, { name, deptDegree }, user.token)
      .then(res => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        navigate('/admin/degree');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading..</h4>
          ) : (
            <h4>Update Department Degree</h4>
          )}

          <div className='form-group'>
            <label htmlFor='degree'>Departmental Degree</label>
            <select
              name='degree'
              className='form-control'
              onChange={e => setDeptDegree(e.target.value)}
            >
              {departments.length > 0 &&
                departments.map(dept => (
                  <option
                    key={dept._id}
                    value={dept._id}
                    selected={dept._id === deptDegree}
                  >
                    {dept.name}
                  </option>
                ))}
            </select>
          </div>

          <CreateDepartmentForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateDeptDegree;

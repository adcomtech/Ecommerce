import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import CreateDepartmentForm from '../../../components/forms/CreateDepartmentForm';
import {
  getMaterial,
  updateMaterial,
} from '../../../httpRequestFun/materialHttp';

const UpdateMaterialPage = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  const navigate = useNavigate();

  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    getMaterial(slug).then(dept => setName(dept.data.name));
  }, [slug]);

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateMaterial(slug, { name }, user.token)
      .then(res => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        navigate('/admin/material-type');
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
            <h4>Update Material Type</h4>
          )}

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

export default UpdateMaterialPage;

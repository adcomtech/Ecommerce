import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  createMaterial,
  deleteMaterial,
  getMaterials,
} from '../../../httpRequestFun/materialHttp';
import CreateDepartmentForm from '../../../components/forms/CreateDepartmentForm';
import SearchForm from '../../../components/forms/SearchForm';

const CreateMaterialPage = () => {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  // A state for Search and filtering implementation
  const [searchQuery, setSearchQuery] = useState('');

  // Loading the Created Departments
  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = () =>
    getMaterials().then(dept => setMaterials(dept.data));

  // Handle the form submit to create department
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createMaterial({ name }, user.token)
      .then(res => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        // Loading Material after been created so as to refresh the page
        loadMaterials();
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
      deleteMaterial(slug, user.token)
        .then(res => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);

          // Loading Material after been created so as to refresh the page
          loadMaterials();
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
  const searched = searchQuery => material =>
    material.name.toLowerCase().includes(searchQuery);

  return (
    <div className='container'>
      <div className='col'>
        {loading ? (
          <h4 className='text-danger'>Loading..</h4>
        ) : (
          <h4>Create Material Types</h4>
        )}

        <CreateDepartmentForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
        />

        {/* step 2 */}
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <hr />
        {/* Displaying All Department with Filter Functionality */}
        {materials.filter(searched(searchQuery)).map(material => (
          <div className='btn-control' key={material._id}>
            {material.name}
            <span onClick={() => handleRemove(material.slug)} className='btn'>
              Delete
            </span>
            <Link to={`/admin/material-type/${material.slug}`}>
              <span className='btn'>Edit</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateMaterialPage;

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getTopic, updateTopic } from '../../../httpRequestFun/topicHttpRequst';
import TopicUpdateForm from '../../../components/forms/TopicUpdateForm';
import { getDepartments } from '../../../httpRequestFun/departmentHttp';
import { getMaterials } from '../../../httpRequestFun/materialHttp';

const initialState = {
  title: '',
  description: '',
  summary: '',
  price: '',
  department: '',
  category: '',
  isSold: '',
  numTopic: '',
  numTopicSold: '',
  images: [],
  fileExts: ['Pdf', 'Docx', 'Doc'],
  degrees: ['M.SC', 'B.SC', 'HND', 'ND', 'NCE'],
  level: '',
};

const UpdateTopicPage = () => {
  // state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector(state => ({ ...state }));

  // router
  const params = useParams();
  const slug = params.slug;

  // redirect
  const navigate = useNavigate();

  // api calls
  useEffect(() => {
    loadTopic();
    loadDepartments();
    loadCategories();
  }, []);

  // Loading Topic from the Server
  const loadTopic = () => {
    getTopic(slug)
      .then(t => {
        setValues({ ...values, ...t.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Loading Departments from the Server
  const loadDepartments = () =>
    getDepartments().then(c => {
      console.log('GET CATEGORIES IN UPDATE PRODUCT', c.data);
      setDepartments(c.data);
    });

  // Loading Categories from the Server
  const loadCategories = () =>
    getMaterials().then(c => {
      console.log('GET CATEGORIES IN UPDATE PRODUCT', c.data);
      setCategories(c.data);
    });

  const handleSubmit = async e => {
    e.preventDefault();
    updateTopic(slug, values, user.token)
      .then(res => {
        setLoading(false);
        toast.success(`"${res.data.title}" is Updated Successfully`);
        navigate('/admin/topics');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-10'>
          {loading ? <h4>Loading</h4> : <h4>Product update</h4>}

          <TopicUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            categories={categories}
            departments={departments}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UpdateTopicPage;

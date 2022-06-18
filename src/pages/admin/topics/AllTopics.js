import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  deleteTopic,
  getAllTopicByCount,
} from '../../../httpRequestFun/topicHttpRequst';

const AllTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    loadAllTopics();
  }, []);

  const loadAllTopics = () => {
    setLoading(true);
    getAllTopicByCount(100)
      .then(res => {
        setTopics(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = slug => {
    // let answer = window.confirm("Delete?");
    if (window.confirm('Are you sure you want to Delete? this Topic')) {
      // console.log("send delete request", slug);
      deleteTopic(slug, user.token)
        .then(res => {
          loadAllTopics();
          toast.success(`${res.data.title} is successfully  deleted`);
        })
        .catch(err => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        {loading ? (
          <h4 className='text-danger'>Loading...</h4>
        ) : (
          <h4>All Topics</h4>
        )}
        {/* <div className='col'>{JSON.stringify(topics)}</div> */}

        <div className='row'>
          {topics.map(topic => (
            <div key={topic._id} className='col-md-4 pb-3'>
              <div className='card'>
                <h6>{topic.title}</h6>
                <p>{`${topic.summary && topic.summary.substring(0, 90)}...`}</p>
                <p>{topic.price}</p>
                {/* <p>{topic.department}</p>
                <p>{topic.category}</p> */}
                <p>{topic.level}</p>
                <p>{topic.fileExt}</p>

                <div className=''>
                  <Link to={`/admin/topic/${topic.slug}`}>Edit</Link>
                  <button onClick={() => handleRemove(topic.slug)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTopics;

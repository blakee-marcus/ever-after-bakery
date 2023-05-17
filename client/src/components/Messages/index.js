import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MESSAGES } from '../../utils/queries';

function Messages(props) {
  const { loading, error, data } = useQuery(QUERY_MESSAGES);
  // console.log(data.messages);
  if (loading) {
    return (
      <section className='container'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title placeholder-glow'>
              <span className='placeholder col-8'></span>
            </h5>
            <h6 className='card-subtitle mb-2 placeholder-glow'>
              <span className='placeholder col-6'></span>
            </h6>
            <p className='card-text placeholder-glow'>
              <span className='placeholder col-7'></span>
              <span className='placeholder col-4'></span>
              <span className='placeholder col-4'></span>
              <span className='placeholder col-6'></span>
              <span className='placeholder col-8'></span>
            </p>
            <p href='#' className='card-link'>
              <span className='placeholder col-4'></span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='container'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>Error</h5>
            <h6 className='card-subtitle mb-2 text-muted'>Sorry about that!</h6>
            <p className='card-text'>
              There was an error loading your messages!
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    <section className='container'>
      <h2>No messages yet!</h2>
    </section>;
  }

  return (
    <section className='container'>
      <h3 className='mb-3'> Messages ({data.messages.length})</h3>
      <div className='container'>
        <div className='row'>
          {data.messages &&
            data.messages.map((message, index) => (
              <div key={index} className='col-3 mb-3'>
                <div className='card h-100'>
                  <div
                    className='card-header'
                    style={{ backgroundColor: '#6c757d' }}
                  >
                    {message.createdAt}
                  </div>
                  <div className='card-body'>
                    <h5 className='card-title'>{message.name}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>
                      {message.email}
                    </h6>
                    <p className='card-text'>{message.message}</p>
                    <a
                      href={`mailto:${message.email}`}
                      className='btn btn-primary'
                    >
                      Reply
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Messages;

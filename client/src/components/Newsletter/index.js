import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_EVENTS } from '../../utils/queries';
import { ADD_EVENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

function Newsletter() {
  const [formState, setFormState] = useState({
    title: '',
    eventBody: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addEvent] = useMutation(ADD_EVENT);

  const { loading, error, data } = useQuery(QUERY_EVENTS);

  const validate = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'title':
        if (value.length < 1) {
          errorMessage = 'Enter a title!';
        }
        break;
      case 'description':
        if (value.length < 1) {
          errorMessage = 'Enter a description!';
        }
        break;
      default:
        errorMessage = '';
    }
    return errorMessage;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrorMessage(validate(name, value));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (errorMessage) {
      return;
    }

    const { title, eventBody } = formState;
    console.log(title);
    try {
      const { data } = await addEvent({
        variables: { title, eventBody },
      });
      setErrorMessage('Event Added');
      setModalVisible(false);
    } catch (e) {
      console.log(e);
      setErrorMessage('There was a problem adding the event!');
    }
  };
  if (loading) {
    return (
      <section>
        <h1 className='text-center pb-5'>Upcoming Events</h1>
        <div className='container'>
          <article className='row justify-content-center pb-5'>
            <figure
              alt='placeholder'
              className='img-thumbnail img-fluid col-6 d-inline-flex placeholder'
            />
            <div className='row col-6'>
              <h2 className='placeholder-glow'>
                <span className='placeholder'></span>
              </h2>
              <p className='placeholder-glow'>
                <span className='placeholder col-7'></span>
                <span className='placeholder col-4'></span>
                <span className='placeholder col-4'></span>
                <span className='placeholder col-6'></span>
                <span className='placeholder col-8'></span>
              </p>
            </div>
          </article>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1 className='text-center pb-5'>Whoops! There's an Error!</h1>
        <p>There was an issue with loading the Newsletter!</p>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section>
        <h1 className='text-center pb-5'>No Upcoming Events!</h1>
      </section>
    );
  }

  return (
    <section className='container'>
      <h1 className='text-center mb-3'>Upcoming Events</h1>
      {Auth.loggedIn() && (
        <div className='d-flex justify-content-center align-items-center mb-3'>
          <button
            className='btn btn-danger'
            onClick={() => setModalVisible(true)}
          >
            Add Event
          </button>
        </div>
      )}

      {modalVisible && (
        <div
          className='d-flex justify-content-center align-items-center mb-4'
          style={{ height: '100%' }}
        >
          <div className='card'>
            <div className='card-body px-5'>
              <div
                className='card-header row d-flex justify-content-between'
                style={{ width: '100%' }}
              >
                <h5 className='w-auto'>Add Event!</h5>
                <button
                  type='button'
                  className='btn-close bg-secondary'
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className='card-body'>
                <form onSubmit={handleFormSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>
                      Event Title
                    </label>
                    <input
                      type='text'
                      name='title'
                      value={formState.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='form-control mb-3'
                      placeholder='Enter event title...'
                    />
                    <label htmlFor='eventBody' className='form-label'>
                      Description
                    </label>
                    <textarea
                      name='eventBody'
                      value={formState.eventBody}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='form-control mb-3'
                      placeholder='Enter event description...'
                    />
                  </div>
                  <button type='submit' className='btn btn-danger'>
                    Submit
                  </button>
                  {errorMessage && (
                    <div className='bs-danger-text'>{errorMessage}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='container'>
        {data.events &&
          data.events.map((event, index) => (
            <article key={index} className='row justify-content-center pb-5'>
              <img
                src='https://via.placeholder.com/600'
                alt='placeholder'
                className='img-thumbnail img-fluid col-6 d-inline-flex placeholder'
              />
              <div className='row col-6 d-flex flex-column justify-content-between'>
                <div>
                  <h2>{event.title}</h2>
                  <h6 className='text-secondary font-weight-light'>
                    {event.createdAt}
                  </h6>
                </div>
                <p className='mb-auto'>{event.eventBody}</p>
              </div>
            </article>
          ))}

        {/* Farmers Market */}

        <h2 className='text-center'>
          Check Us Throughout the Week at the Farmer's Market!
        </h2>

        <div className=''>
          <img
            //src assignd required expression | incremental naming of the imgs using i
            // default property --> is where the img has been saved. To render img, default property must be invoked
            src={require(`../../assets/images/newsletter/newsletterFarm1.webp`)}
            alt='farmersMarket'
            className='img-thumbnail'
            style={{ width: '20%' }}
          />
          <img
            //src assignd required expression | incremental naming of the imgs using i
            // default property --> is where the img has been saved. To render img, default property must be invoked
            src={require(`../../assets/images/newsletter/newsletterFarm2.webp`)}
            alt='farmersMarket'
            className='img-thumbnail flex-fill'
            style={{ width: '20%' }}
          />
          <img
            //src assignd required expression | incremental naming of the imgs using i
            // default property --> is where the img has been saved. To render img, default property must be invoked
            src={require(`../../assets/images/newsletter/newsletterFarm3.webp`)}
            alt='farmersMarket'
            className='img-thumbnail flex-fill'
            style={{ width: '20%' }}
          />
          <img
            //src assignd required expression | incremental naming of the imgs using i
            // default property --> is where the img has been saved. To render img, default property must be invoked
            src={require(`../../assets/images/newsletter/newsletterFarm4.webp`)}
            alt='farmersMarket'
            className='img-thumbnail flex-fill'
            style={{ width: '20%' }}
          />
          <img
            //src assignd required expression | incremental naming of the imgs using i
            // default property --> is where the img has been saved. To render img, default property must be invoked
            src={require(`../../assets/images/newsletter/newsletterFarm5.webp`)}
            alt='farmersMarket'
            className='img-thumbnail  flex-fill'
            style={{ width: '20%' }}
          />
        </div>
      </div>
    </section>
  );
}

export default Newsletter;


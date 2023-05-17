import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ADD_MESSAGE } from '../../utils/mutations';

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [addMessage] = useMutation(ADD_MESSAGE);
  const validate = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'name':
        if (value.length < 2) {
          errorMessage = 'Enter your full name!';
        }
        break;
      case 'email':
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address.';
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
    const { name, email, message } = formState;
    try {
      const { data } = await addMessage({
        variables: { name, email, message },
      });
      setErrorMessage('Message Sent!');
    } catch (e) {
      console.error(e);
      setErrorMessage(
        'There was a problem sending your message. Try again later.'
      );
    }
  };

  return (
    <Form className='contactForm container' onSubmit={handleFormSubmit}>
      <Form.Group className='mb-3' controlId='formGroupName'>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type='text'
          name='name'
          placeholder='Enter your name'
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formGroupEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter your email'
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='message'>
        <Form.Label>Message:</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          name='message'
          placeholder='Message for Ever After Bakery'
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type='submit'>Submit</Button>
      {errorMessage && <div>{errorMessage}</div>}
    </Form>
  );
}

export default Contact;


import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
 
import { useContext } from 'react';
import { MyContext } from '../../App';
const Contact = () => {
 const {userinfo}=useContext(MyContext)
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_lt4h654', 'template_hl8z73c', form.current, 'T8BSAWrSywkzBjdeG')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);

      });
  };

  return (
    <>
    <div>Sendemail</div>
    {console.log(userinfo)}
    <form ref={form} onSubmit={sendEmail}>
      <label >Name</label>
      <input type="text" name="user_name"/>
      <label>Email</label>
      <input type="email" name="user_email" placeholder='wite email' value={userinfo}/>
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  ;
    </>
  )
}

export default Contact
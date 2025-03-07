import React from 'react';
import wendy from '../../assets/images/about/wendy.jpeg';
function About() {
  return (
    <section className='pt-4 container'>
      <h2 className='text-center pb-5'>
        Meet Wendy Ramirez | Home Bakery Owner, Wife, and Mother.
      </h2>

      <div className='bio container d-inline-flex'>
        <img src={wendy} alt='' height='220' />
        <p className='aboutme mx-5'>
          I make custom treats for all celebrations and everything I make is
          custom. I take what ideas my clients have and turn them into delicious
          edible art pieces. My goal is to create a one of a kind dessert
          experience for every individual, a center piece dessert creation that
          WOWS your guests, a conversation starter, a unique show stopper. My
          desserts don’t only look great but they taste great as well. That is
          extremely important to me. Let’s face it, the reason why you want to
          stuff your face with a great tasting birthday cake is because it
          tastes great and not because it looks like a statue in an art museum!
          Although that would be cool too! I use the best quality ingredients
          that I can get my hands on and my recipes were born from my very own
          tried, true, and deliberate recipes. Being a baker and decorator is
          not easy. I am completely self taught and am constantly learning. I’m
          always keeping up with dessert trends, new flavor combinations,
          decorating styles, techniques, and using different decorating mediums.
          Along with following local health and food safety laws that allow me
          to bake and sell from my home there are certain baking/decorating
          processes that must be adhered to that I think most people do not
          understand. So much hard work and so many long hours go into making
          these desserts look the way they do. But I’m happy to do it. I am just
          a regular person that believes that everyday should be a celebration
          of Life.
        </p>
      </div>
    </section>
  );
}

export default About;

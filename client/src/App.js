import React, { useState } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import About from './components/About';
import BakedGoods from './components/Baked-Goods';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Messages from './components/Messages';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  const [currentPage, setCurrentPage] = useState("About")
  document.title = `${currentPage} | Ever After Bakery`;  
  function pageChanger(page) {

    if (page === "About") {
      return <About />
    }
    if (page === "Baked-Goods") {
      return <BakedGoods />
    }
    if (page === "Newsletter") {
      return <Newsletter />
    }
    if (page === "Contact") {
      return <Contact />
    }
    if (page === "Login") {
      return <Login setCurrentPage={setCurrentPage}/>
    }
    if (page==="Messages") {
        return <Messages />
    }
  }


  // uses state to get the page
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header
          setCurrentPage={setCurrentPage}
          className="App-header" />
        {pageChanger(currentPage)}
        <Footer />
        {/* <LoginMutation /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;

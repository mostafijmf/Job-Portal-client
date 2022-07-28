import React from 'react';
import Footer from './Footer';
import Header from './Header';

const HelpCenter = () => {
    return (<>
        <Header></Header>
        <section className='flex items-center justify-center h-screen'>
            <h1 className='md:text-5xl sm:text-4xl text-3xl text-gray-400 text-center'>Comming soon.....</h1>
        </section>
        <Footer></Footer>
    </>);
};

export default HelpCenter;
import { useState, useRef, useEffect } from 'react';

import Carousel from '@/components/carousel';
import Navbar from '@/components/navbar';
import Slider from '@/components/slider';
import Product from '@/components/productCarousel';
import Card from '@/components/card';
import ProductRow from '@/components/productRow';
const Home = () => {





    return (

        <>
            
            <Navbar/>
            <Card/>
            <ProductRow/>
            <Slider/>
            <Carousel/>
            <Product/>
       
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
            
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </>
    );
};

export default Home;
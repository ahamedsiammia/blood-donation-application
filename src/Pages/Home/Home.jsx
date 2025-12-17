import React from 'react';
import Banner from '../../Components/Banner';
import FeatureSection from './FeatureSection/FeatureSection';
import Contract from './Contract/Contract';

const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <Contract></Contract>
        </div>
    );
};

export default Home;
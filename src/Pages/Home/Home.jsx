import { motion } from 'framer-motion';
import Banner from '../../Components/Banner';
import Features from './Features/Features';
import Contract from './Contract/Contract';
import ServicesSection from '../../Components/ServicesSection/ServicesSection';
import StatisticsSection from '../../Components/StatisticsSection/StatisticsSection';
import NewsletterSection from '../../Components/NewsletterSection/NewsletterSection';
import Testimonials from '../../Components/Testimonials/Testimonials';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Banner></Banner>
            <Features></Features>
            <ServicesSection></ServicesSection>
            <StatisticsSection></StatisticsSection>
            <Testimonials></Testimonials>
            <NewsletterSection></NewsletterSection>
            <Contract></Contract>
        </motion.div>
    );
};

export default Home;
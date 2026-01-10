import { motion } from 'framer-motion';
import Banner from '../../Components/Banner';
import Features from './Features/Features';
import Contract from './Contract/Contract';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Banner></Banner>
            <Features></Features>
            <Contract></Contract>
        </motion.div>
    );
};

export default Home;
import { motion } from "motion/react"
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import { easeInOut } from "motion";
const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-[540px] bg-bannerBg">
      <div className="hero-content justify-between flex-col lg:flex-row-reverse">
        <div className="w-full md:w-2/5 space-y-10">
          <motion.img
          animate={{y:[0,41,0]}}
          transition={{duration :5, ease:easeInOut , repeat:Infinity, delay:0.3}}
            src={banner1}
            className="max-w-[80%] shadow-2xl rounded-3xl rounded-bl-none border-l-4 border-b-4 border-primary "
          />
          <motion.img
           animate={{x:[0,50,0]}}
           transition={{duration :5, ease:easeInOut , repeat:Infinity, delay:0.8}}
            src={banner2}
            className="w-2/3 shadow-2xl rounded-3xl rounded-br-none border-l-4 border-b-4 border-primary "
          />
        </div>
        <div className="w-full md:w-2/4 ">
          <h1 className="text-5xl font-bold text-primary">
            The <span className="text-highlight">Easiest Way</span> to Get Your New Job
          </h1>
          <p className="py-6">
            Each month, more than 3 million job seekers turn to website in their
            search for work, making over 140,000 applications every single day
          </p>
          <motion.button 
          whileTap ={{scale : 0.9}}
          whileHover ={{scale : 1.1}}
          className="btn bg-primary text-white hover:text-primary">Get Started</motion.button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

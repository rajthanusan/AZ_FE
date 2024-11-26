import React from 'react';
import HeroSection from '../pages/HeroSection';
import Plans from '../pages/Plans';
import Services from '../pages/Services';

import FAQ from '../pages/FAQ';
//import AR from '../pages/RoomDesign';
import Room from '../pages/CustomizeRoomSection';
import Servicesection from '../pages/ServicesSection';
// import Chatbot from '../pages/Chatbot';


const User = () => {
  return (
    <div> 
      <HeroSection />
      
     <Room />
      <Plans />
      <Services />
      {/* <Chatbot/> */}
      
      <FAQ />
      <Servicesection/>
     
    </div>
  );
};

export default User;

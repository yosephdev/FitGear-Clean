// src/services/imageService.js

// Import all the local images
import mensWorkoutTank from '../assets/images/mens-workout-tank.jpg';
import pelotonBike from '../assets/images/peloton-bike.jpeg';
import smartTreadmill from '../assets/images/smart.jpg';
import yogaPant from '../assets/images/yoga-pant.jpg';

const images = {
  '/frontend/src/assets/images/mens-workout-tank.jpg': mensWorkoutTank,
  '/frontend/src/assets/images/peloton-bike.jpeg': pelotonBike,
  '/frontend/src/assets/images/smart.jpg': smartTreadmill,
  '/frontend/src/assets/images/yoga-pant.jpg': yogaPant,
  '/frontend/src/assets/images/smart-treadmill.jpg': smartTreadmill,
  '/frontend/src/assets/images/peloton-style-bike.jpeg': pelotonBike,
};

export const getProductImage = (imagePath) => {
  return images[imagePath];
};

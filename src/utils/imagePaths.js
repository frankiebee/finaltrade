// src/utils/imagePaths.js
const basePath = process.env.PUBLIC_URL || '';

export const IMAGES = {
  background: `${basePath}/assets/images/neon_hum.png`,
  toedLogo: `${basePath}/assets/images/toed-logo.png`,
  mnrchLogo: `${basePath}/assets/images/mnrch-logo.png`,
  monarch: `${basePath}/assets/images/monarch.png`,
  sloth: `${basePath}/assets/images/sloth.png`,
  neonHum: `${basePath}/assets/images/neon_hum.png`,
  solarArena: `${basePath}/assets/images/Solar_Cyber_Arena.png`,
  logo: `${basePath}/assets/images/final_trade_logo.png`,
};

const getImagePath = (imageName) => {
  return `${basePath}/assets/images/${imageName}`;
};

export default getImagePath;
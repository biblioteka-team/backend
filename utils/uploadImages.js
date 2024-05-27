const axios = require('axios');
const fs = require('fs');
const path = require('path');

const VERCEL_TOKEN = 'prj_G2WxqBhX2YXy9Z5zjydN6eZjgmlm'; // Replace with your Vercel token
// const VERCEL_TEAM_ID = 'your-team-id';    // Optional: your Vercel team ID if you are part of a team

const uploadImageToVercelBlob = async (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  const imageName = path.basename(imagePath);

  try {
    const response = await axios.post(
      '/api/avatar/upload?filename=the_hobbit.jpg',
      imageBuffer,
      {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': imageBuffer.length,
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
        },
        params: {
          name: imageName,
          access: 'public'
          // teamId: VERCEL_TEAM_ID, // Include if applicable
        },
      }
    );

    console.log('Image uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error.response ? error.response.data : error.message);
    throw error;
  }
};


module.exports = uploadImageToVercelBlob;
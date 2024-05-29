// const { createBlobClient } = require('@vercel/blob');

// const blob = new createBlobClient({
//   token: process.env.VERCEL_BLOB_TOKEN,
// });

const uploadImagesHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  const blob = await put(filename, request, {
    access: 'public'  
  });


    // // Upload the file to Vercel Blob
    // const result = await blob.put(req.file.originalname, req.file.buffer, {
    //   contentType: req.file.mimetype,
    // });

    res.status(200).json({
      message: 'File uploaded successfully!',
      url: blob.url, // The URL of the uploaded file
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file.');
  }
};

export default uploadImagesHandler;

// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// const dotenv = require("dotenv");
// dotenv.config({path: "../.env"});




// const uploadImageToVercelBlob = async (imagePath) => {
//   const imageBuffer = fs.readFileSync(imagePath);
//   const imageName = path.basename(imagePath);

//   try {
//     const response = await axios.post(
//       'http://localhost:8000?filename=ulysses.jpg',
//       imageBuffer,
//       {
//         headers: {
//           'Content-Type': 'application/octet-stream',
//           'Content-Length': imageBuffer.length,
//           'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
//         },
//         params: {
//           name: imageName,
//           access: 'public'
//         },
//       }
//     );

//     console.log('Image uploaded successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading image:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };


// module.exports = uploadImageToVercelBlob;
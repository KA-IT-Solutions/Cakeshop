


// // src/utils.js
// export const generateWhatsAppLink = (cake) => {
//     const phoneNumber = '9764065434'; // Your phone number
//     const message = `I would like to order a ${cake.name} (${cake.category}) for ${cake.price}.`;
//     return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
// };


// src/utils.js
export const generateWhatsAppLink = (cake) => {
    const phoneNumber = '9764065434'; // Your phone number
    const message = `I would like to order a ${cake.name} (${cake.category}) for ₹${cake.price}. Here is the image: ${process.env.PUBLIC_URL + cake.image}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
<<<<<<< HEAD
  };
  
=======
};
  

// // src/utils.js
// export const generateWhatsAppLink = (cake) => {
//     const phoneNumber = '9764065434'; // Your phone number
//     const imageUrl = `${process.env.REACT_APP_PUBLIC_URL}/${cake.image}`;
//     const message = `I would like to order a ${cake.name} (${cake.category}) for ₹${cake.price}. Here is the image: ${imageUrl}`;
//     console.log("Generated WhatsApp message:", message); // Log for debugging
//     return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//   };
>>>>>>> bad26c0d303938cdba8b534b9278db1fcfb64d79
  
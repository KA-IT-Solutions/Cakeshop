


// src/utils.js
export const generateWhatsAppLink = (cake) => {
    const phoneNumber = '1234567890'; // Your phone number
    const message = `I would like to order a ${cake.name} (${cake.category}) for ${cake.price}.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

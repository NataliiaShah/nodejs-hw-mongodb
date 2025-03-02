import User from "../db/models/contacts.js";

export const getAllContacts = async () => {
  try {
    const contacts = await User.find();
    if (contacts.length === 0) {
      console.log('No contacts found!');
    }
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Internal Server Error');
  }
};

export const getContactById = async (contactId) => {
  try {
    return await User.findById(contactId);
  } catch (error) {
    console.error(`Error fetching contact with ID ${contactId}:`, error);
    throw new Error('Internal Server Error');
  }
};

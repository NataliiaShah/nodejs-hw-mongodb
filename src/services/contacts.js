import  User  from "../db/models/contacts.js";

export const getAllContacts = async () => {
  return await User.find();
};

export const getContactById = async (contactId) => {
  return await User.findById(contactId);
};

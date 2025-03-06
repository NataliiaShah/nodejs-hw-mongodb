import User from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const contacts = await User.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    return await User.findById(contactId);
};

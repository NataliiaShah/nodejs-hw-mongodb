import User from "../db/models/contacts.js";

export const getAllContacts = async () => {
    return await User.find();
};

export const getContactById = async (contactId) => {
    return await User.findById(contactId);
};

export const createContact = async (payload) => {
    return await User.create(payload);

};

export const updateContact = async (contactId, payload) => {
  const rawResult = await User.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );
  if (!rawResult) return null;

  return rawResult;
};

export const deleteContact = async (contactId) => {
  const contact = await User.findByIdAndDelete({
    _id: contactId,
  });
  return contact;
};

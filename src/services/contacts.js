import User from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page = 1,
  perPage = 10, }) => {

  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = User.find();
  const contactsCount = await User.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };

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

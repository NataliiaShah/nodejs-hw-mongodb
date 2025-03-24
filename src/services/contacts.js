import { SORT_ORDER } from "../constants/index.js";
import Contact from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {

  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({userId});

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite === true) {
    contactsQuery.where('isFavourite').equals(true);
  } else if (filter.isFavourite === false) {
    contactsQuery.where('isFavourite').equals(false);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find({userId}).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };

};

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const createContact = async (payload, userId) => {
  const contact = new Contact({
    ...payload,
    userId,
  });
    return await contact.save();

};

export const updateContact = async (contactId, payload, userId) => {
  const contact = await Contact.findOneAndUpdate({
    _id: contactId, userId },
    payload,
    { new: true },
  );
  if (!contact) return null;

  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId, userId: userId,
  });
  return contact;
};

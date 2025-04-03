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

export const getContactById = async ({ _id, userId }) => {
  return await Contact.findOne({ _id, userId });
};

export const createContact = async (payload) => {
  return await Contact.create(payload);
};

export const updateContact = async (conditions, payload) => {
  const rawResult = await Contact.findOneAndUpdate(
    conditions,
    { $set: payload },
    { new: true },
  );
  if (!rawResult) return null;

  return rawResult;
};

export const deleteContact = async ({ _id, userId }) => {
  const contact = await Contact.findOneAndDelete({
    _id,
    userId,
  });
  return contact;
};

import pino from 'pino';
import { getAllContacts, getContactById } from '../services/contacts.js';

const logger = pino();

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    logger.info(`Received contactId: ${contactId}`);

    const contact = await getContactById(contactId);

    if (!contact) {
        return res.status(404).json({
            status: 404,
            message: `Contact with id ${contactId} not found`,
        });
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
    });
};

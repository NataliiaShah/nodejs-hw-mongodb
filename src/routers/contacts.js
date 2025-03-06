import { Router } from "express";
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactController));

router.patch('/:studentId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;








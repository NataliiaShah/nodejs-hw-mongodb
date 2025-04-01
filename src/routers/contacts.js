import { Router } from "express";
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
    updateValidationShema,
    createValidationShema,
} from "../validation/contacts.js";
import { upload } from '../middlewares/multer.js';


const router = Router();

router.use(authenticate);

router.use('/:contactId',
    isValidId);

router.get('/',
    ctrlWrapper(getContactsController));

router.get('/:contactId',
    isValidId,
    ctrlWrapper(getContactByIdController));

router.post('/',
    upload.single('photo'),
    validateBody(createValidationShema),
    ctrlWrapper(createContactController));

router.patch('/:contactId',
    isValidId,
    upload.single('photo'),
    validateBody(updateValidationShema), ctrlWrapper(patchContactController));

router.delete('/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController));

export default router;




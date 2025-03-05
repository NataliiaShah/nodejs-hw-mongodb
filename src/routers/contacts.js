import { Router } from "express";
import { getContactsController, getContactByIdController } from "../controllers/contacts.js";

const router = Router();

// Маршрут для отримання всіх контактів
router.get('/', getContactsController);

// Маршрут для отримання контакту за ID
router.get('/:contactId', getContactByIdController);

export default router;








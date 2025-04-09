import express from 'express';
import {
  createVaultItem,
  getVaultItems,
  deleteVaultItem,
  createMasterKey,
  checkMasterKey,
} from '../controller/VaultController.js';
import { protect } from '../Middleware/Auth.js';

const router = express.Router();

router.post('/add', protect, createVaultItem);
router.get('/', protect, getVaultItems);
router.delete('/:id', protect, deleteVaultItem);
router.post("/createmasterkey",protect,createMasterKey)
router.post("/checkMasterKey",protect,checkMasterKey)


export default router;

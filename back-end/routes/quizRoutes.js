import express from 'express';
import { createQuiz } from '../controllers/quizCont.js';

const router = express.Router();

router.post('/create', createQuiz);

export default router;
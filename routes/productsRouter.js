import { Router } from 'express';

const router = Router();

router.get('/realtimeproducts', (req, res) => {
    res.render('index');
})

export default router;
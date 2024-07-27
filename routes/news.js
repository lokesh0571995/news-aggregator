const express = require('express');
const { getNews, markAsRead, markAsFavorite, getReadArticles, getFavoriteArticles, searchNews } = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getNews);
router.post('/:id/read', authMiddleware, markAsRead);
router.post('/:id/favorite', authMiddleware, markAsFavorite);
router.get('/read', authMiddleware, getReadArticles);
router.get('/favorites', authMiddleware, getFavoriteArticles);
router.get('/search/:keyword', authMiddleware, searchNews);

module.exports = router;

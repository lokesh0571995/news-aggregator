const axios = require('axios');
const User  = require('../models/User');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 600 }); // cache TTL of 10 minutes


//Get News
exports.getNews = async (req,res) =>{

    const { userId } = req.user;

    try{
        const user = await User.findById(userId);
        const preferences = user.preferences;
        const cacheKey = `news_${userId}`;
        let newsArticles = myCache.get(cacheKey);

        if (!newsArticles) {
            newsArticles = [];
            for (const preference of preferences) {
                const response = await axios.get(`https://newsapi.org/v2/everything?q=${preference}&apiKey=a9dc223dc9254b5787d9f03baa23540a`);
                newsArticles.push(...response.data.articles);
            }
            myCache.set(cacheKey, newsArticles);
        }

        res.json(newsArticles);
        
    }catch{
        res.status(500).json({ error: 'Server error' });
    }

};


//Mark Read News
exports.markAsRead = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.readArticles.push(req.params.id);
        await user.save();
        res.json({ msg: 'Article marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


//Mark Favorite news
exports.markAsFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.favoriteArticles.push(req.params.id);
        await user.save();
        res.json({ msg: 'Article marked as favorite' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


//Get Read Articles
exports.getReadArticles = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.readArticles);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


//Get Favorite Articles
exports.getFavoriteArticles = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.favoriteArticles);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


//Search news for keyword
exports.searchNews = async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${req.params.keyword}&apiKey=a9dc223dc9254b5787d9f03baa23540a`);
        res.json(response.data.articles);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
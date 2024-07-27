const User  = require('../models/User');


//Get Prwferences
exports.getPreferences = async (req,res) =>{
    try{
        const user = await User.findById(req,user.id);
        res.json(user.preferences);

    }catch{
        res.status(500).json({ error: 'Server error' });
    }

};

//Update Preferences
exports.updatePreferences = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        user.preferences = req.body.preferences;
        await user.save();
        res.json(user.preferences);

    }catch{
        res.status(500).json({ error: 'Server error' });
    }
};
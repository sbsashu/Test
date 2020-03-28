let express = require('express');
let router = express.Router();
let { Access_Token } = require('./middleware/User_Access')
let { 
	SignUp,
	Login
} = require('./routes/users');
let { 
	All_Publish_News,
	Publish_News,
	Edit_Publish_News,
	Delete_Publish_News,
	News_getBy_id,
	UserPublishNews
} = require('./routes/news')
//GET PUBLISH NEWS
router.get('/news', All_Publish_News);
//USER ? REGISTER
router.post('/register', SignUp);
//USER ? LOGIN
router.post('/login', Login)
//NEWS PUBLISH 
router.post('/publish', [Access_Token], Publish_News);
//EDIT PUBLISH  NEWS
router.get('/edit/:id', [Access_Token], News_getBy_id);
router.get('/user-news', [Access_Token], UserPublishNews);
router.post('/edit/:id', [Access_Token], Edit_Publish_News);
router.delete('/delete/:id',[Access_Token], Delete_Publish_News);

module.exports = router;
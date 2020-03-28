module.exports = {

    All_Publish_News: async (req, res) => {
        let all_news = "SELECT * FROM news ORDER BY created_at DESC";
        connection.query(all_news, (err, result) => {
            if(err) throw err;

            res.status(200).send({
                success: true,
                data: result
            })
        })
    },
    Publish_News: async (req, res) => {
        let { title, description, image } = req.body;
            image = null;
            let user_id = req.user.id
            let data = [
                user_id,
                title,
                description,
                image
            ];

        if(!title || !description) 
            return res.status(401).send({success: false, message: 'Fields are missing'});

        if(typeof title !== 'string' || typeof description !== 'string')
            return res.status(401).send({success: false, message: 'Fields are missing'});
        if(description.length < 3000) 
            return res.status(401).send({success: false, message: 'Description should be 5000 character long'});
        try {
        let user = "SELECT * FROM news WHERE title = '"+title+"'";
        connection.query(user, (err, result) => {
            if(err) throw err;

            if(result.length > 0) {
                return res.status(200).send({
                    success: false,
                    message: "Please change some title keywords and try to post!"
                })
            }
            let Publish_News = "INSERT INTO news (user_id, title, description, image) VALUES (?)";

            connection.query(Publish_News, [data], (err, result) => {
                if(err) throw err;

                if(result)
                    return res.status(200).json({
                        success: true,
                        data: 'New post Successfully post'
                    })
            })
        })
        } catch (error) {
            console.log('NEW PUBLISH ', error.message)
            return res.status(500).send({
                success: false,
                message: 'Server Error'
            })
        }
    },
    News_getBy_id: async (req, res) => {
        let id = req.params.id;
        let user_id = req.user.id
        if(!id)
            return res.status(401).send({success: false, message: 'Field is missing'});
        let GetBy_id = "SELECT * FROM news WHERE user_id = '"+user_id+"' and id = '"+id+"'";

        connection.query(GetBy_id, (err, result) => {
            if(err) throw err;
        
            if(result.length  > 0) 
                return res.status(200).send({success: true, data: result[0]})
            else
                return res.status(404).send({success: false, message: 'News not publish yet! please publish news'})
        })
    },
    Edit_Publish_News: async (req, res) => {
        let id = req.params.id;
        let {
            title,
            description,
            image
        } = req.body;
        let user_id = req.user.id;
        let data = [
            title,
            description,
            image
        ]
        if(!id || !title || !description)
            return res.status(200).send({success: false, message: 'Fields are missing'});
        
        let Edit_Publish = "SELECT * FROM news WHERE user_id = '"+user_id+"' and id = '"+id+"'";
        
        connection.query(Edit_Publish, (err, result) => {
            if(err) throw err;

            if(result.length > 0) {
                let Publish = "INSERT INTO news (user_id, title, description, image) VALUES(?)";
                connection.query(Publish, [data], (err, result) => {
                    if(err) throw err;

                    return res.status(200).send({
                        success: true,
                        message: 'News edit successfully'
                    })
                })
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'News not found'
                })
            }
        })
    },
    Delete_Publish_News: async (req, res) => {
        let id = req.params.id;

        if(!id)
            return res.status(200).send({success: false, message: 'Field is missing'});
        
        try {
            let News = "SELECT * FROM news WHERE user_id = '"+req.user.id+"' and id = '"+id+"'";
            
            connection.query(News, (err, result) => {
                if(err) throw err;

                if(result.length > 0) {
                    var sql = "";
                    let News_Delete = "DELETE FROM news WHERE id = '"+id+"'";
                    connection.query(News_Delete, (err, result) =>  {
                        if(err) throw err;

                        return res.status(200).send({
                            success: true,
                            message: 'News deleted successfully'
                        })
                    })
                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'News not found'
                    })
                }
            })
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: 'Server error'
            })
        }
    },
    UserPublishNews: async (req, res) => {
        let user_id = req.user.id;
        
        let all_news = "SELECT * FROM news WHERE user_id = '"+user_id+"' ORDER BY created_at DESC";

        try {
            connection.query(all_news, (err, result) => {
                if(err) throw err;

                if(result.length > 0)
                    return res.status(200).send({success: true, data: result});
                else
                    return res.status(404).send({success: false, message: 'News not found'})
            })
        } catch (error) {
            console.log('GETTING ALL NEWS BY USER', error.message)
            return res.status(500).send({
                success: false,
                message: "Server"
            })
        }
    }
}
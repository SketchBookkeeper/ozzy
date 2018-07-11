module.exports = {
    getPosts: (req,res) => {
        req.app.get("db").posts.get_all_posts().then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    getLikedPosts: (req,res) => {
        req.app.get("db").posts.get_liked_posts([req.session.user.id,req.params.postid]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    likePost: (req,res) => {
        req.app.get("db").posts.like_post([req.params.postid, req.session.user.id, req.body.liked]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    lovePost: (req,res) => {
        req.app.get("db").posts.love_post([req.params.postid, req.session.user.id, req.body.loved]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    likeNewPost: (req,res) => {
        req.app.get("db").posts.like_new_post([req.params.postid, req.body.liked, req.body.loved, req.session.user.id]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    getComments: (req,res) => {
        req.app.get("db").posts.get_comments([req.params.postid]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(response);
            console.log(err);
        })
    },
    leaveComment: (req,res) => {
        req.app.get("db").posts.leave_comment([req.params.postid, req.session.user.id, req.body.text]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    },
    newPost: (req,res) => {
        req.app.get("db").posts.create_post([req.session.user.id, req.body.date, req.body.post, req.body.status]).then(() => {
            res.sendStatus(200)
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        })
    }
}
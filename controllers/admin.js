const User = require("../models/User");
const Article = require("../models/Template");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    const user = await User.findOne({ email: email });
    try {
        if (user) {
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                return res.status(401).json({ message: 'Email OR password not correct!' });
            }
            const token = jwt.sign(    {
                    name: user.name,
                    id: user._id.toString(),
                    image: user.profilePicture
                },               "SomeSuperAsecretBymy",
                { expiresIn: "9h" } );

            return res.status(200).json({ token: token, user: user });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong' });
    }
};


exports.users = async (req, res, next) => {
    try {
        const users = await User.find();
        return await res.status(200).json({
            users: users
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("Could not find user.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Somthing went wrong. Please try again.', messageType: 'warning' })
        await user.remove()
        return res
            .status(200)
            .json({ message: "User Delete", userId: userId });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};





exports.articles = async (req, res, next) => {
    try {
        const articles = await Article.find();

        return await res.status(200).json({
            articles: articles
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.createArticle = async (req, res, next) => {
    const content = req.body.content;
    const title = req.body.title;
    const category = req.body.category;
    const tags = JSON.parse(req.body.tags);
    // const delta = JSON.parse(req.body.delta);

    let image;
    if (req.file) {
        image = req.file.path.replace("\\", "/");
    } else {
        image = ''
    }
    try {
        const article = new Article({
            title: title,
            content: content,
            image: image,
            tags: tags,
            category: category,
            shares: [],
            comments: [],
            reactions: {
                clab: 0,
                love: 0,
                like: 0,
            },
            discussion: [],
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('h:mm a'),
            // delta: { ...delta }
        });

        await article.save();
        return await res.status(201).json({
            message: 'Created',
            article: article
        });
    } catch (error) {
        console.log(error);


        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getArticle = async (req, res, next) => {
    const articleId = req.params.id;
    try {

        const article = await Article.findById(articleId);
        if (!article) return res.status(404).json({ message: 'Somthing went wrong. Please try again.', messageType: 'warning' })
        return res
            .status(200)
            .json({ article: article });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.editArticle = async (req, res, next) => {
    const articleId = req.params.id;
    const content = req.body.content;
    const title = req.body.title;
    const category = req.body.category;
    const tags = JSON.parse(req.body.tags);
    // const delta = JSON.parse(req.body.delta);


    try {
        let image;
        const article = await Article.findById(articleId)
        if (!article) { return res.status(404).json({ message: 'Somthing went wrong. Please try again.', messageType: 'warning' }) }
        if (req.file) {
            image = req.file.path.replace("\\", "/");
        } else {
            image = article.image
        }

        article.title = title
        article.content = content
        article.category = category
        article.image = image
        article.tags = tags
        // article.delta = { ...delta }
        await article.save();
        return await res.status(200).json({ message: 'Created', article: article });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteArticle = async (req, res, next) => {
    const articleId = req.params.id;
    try {
        const article = await Article.findById(articleId);
        if (!article) return res.status(404).json({ message: 'Somthing went wrong. Please try again.', messageType: 'warning' })
        await article.remove()
        return res
            .status(200)
            .json({ message: "article Delete", articleId: articleId });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};


exports.uploadImage = async (req, res, next) => {
    if (req.file) {
        return res.status(200).json('/' + req.file.path.replace("\\", "/"))
    }
}


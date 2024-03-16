const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

// Home route - display existing posts and a form to create new ones
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Route to handle form submission for creating new posts
app.post('/post', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

// Route to display an individual post
app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    res.render('post', { post: post, postId: postId });
});

// Route to display form for editing a post
app.get('/post/:id/edit', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }
    res.render('edit', { post: post, postId: postId });
});



// Route to handle editing a post
app.post('/post/:id/edit', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    posts[postId] = { title, content };
    res.redirect(`/post/${postId}`);
});

// Route to delete a post
app.post('/post/:id/delete', (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
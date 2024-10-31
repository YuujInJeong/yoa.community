const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// POST 데이터 읽기
const getPosts = () => {
  const postsData = fs.readFileSync(path.join(__dirname, '../models/posts.json'), 'utf8');
  return JSON.parse(postsData);
};

// 모든 게시글 조회
router.get('/', (req, res) => {
  try {
    const data = getPosts();
    res.json(data.posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 특정 게시글 조회
router.get('/:id', (req, res) => {
  try {
    const data = getPosts();
    const post = data.posts.find(p => p.id === parseInt(req.params.id));
    
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
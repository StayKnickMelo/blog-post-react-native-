const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const Post = require('../model/Post');
const { protect } = require('../middleware/auth');




// @route GET /posts/
// @desc get all posts
// @access public
router.get('/', async (req, res) => {

  try {

    const posts = await Post.find();

    res.status(200).json({
      success: true,
      data: posts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
});


// @route GET /posts/:postId
// @desc ge a single post
// @access public
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post Not Found'
      });
    };

    res.status(200).json({
      success: true,
      data: post
    })

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Post Not Found'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
})




// @route POST /posts/
// @desc add a post
// @access private
router.post('/', [protect, [
  check('title', 'Please add a title').not().isEmpty(),
  check('text', 'Please add some text').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  };

  try {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;

    const post = await Post.create(req.body);

    res.status(201).json({
      success: true,
      data: post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
});


// @route PUT /posts/:postId
// @desc update a  post
// @access private
router.put('/:postId', [protect, [
  check('title', 'Please add a title').not().isEmpty(),
  check('text', 'Please add some text').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  try {
    let post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post Not Found'
      })
    };

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      })
    };

    post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      runValidators: true,
      new: true
    });

    res.status(200).json({
      success: true,
      data: post
    })

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Not Found'
      });
    };

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }

})


// @route DELETE /posts/:postId
// @desc delete a post
// @access private
router.delete('/:postId', protect, async (req, res) => {
  try {

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post Not Found'
      })
    };

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      })
    };

    await post.remove();

    res.status(200).json({
      success: true,
      deleted: true
    })

  } catch (error) {

    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Post Not Found'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});



router.put('/:postId/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post Not Found'
      })
    };

    if (post.likes.filter(like => like.user._id.toString() === req.user._id.toString()).length > 0) {

      post.likes = post.likes.filter(like => like.user.toString() !== req.user._id.toString());

      await post.save();

      return res.status(200).json({
        success: true,
        data: post.likes
      })
    };

    if (post.likes.filter(like => like.user.toString() === req.user._id.toString()).length === 0) {

      post.likes.unshift({ user: req.user._id });

      await post.save();

      return res.status(200).json({
        success: true,
        data: post.likes
      })
    };


  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    })

  }

});


module.exports = router;
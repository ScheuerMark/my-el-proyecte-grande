using System.Net;
using Forum.Data;
using Forum.Models;
using Forum.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers
{
    [Route("api/Home/")]
    [ApiController]
    public class ApiHomeController : ControllerBase
    {
        private readonly ILogger<ApiHomeController> _logger;

        private UserManager<AppUser> _userManager;
        private TopicService _topicService;
        private PostService _postService;
        private CommentService _commentService;

        public ApiHomeController(ILogger<ApiHomeController> logger, UserManager<AppUser> userMgr, TopicService topicService, PostService postService, CommentService commentService)
        {
            _logger = logger;
            _userManager = userMgr;
            _topicService = topicService;
            _postService = postService;
            _commentService = commentService;
        }

        [HttpGet("Posts/{topicName}")]
        public List<Post> Posts(string topicName)
        {
            return _postService.GetPostsByTopicTitle(topicName).Result;
        }
        
        [HttpGet("Topics/")]
        public List<Topic> Topics()
        {
            return _topicService.GetAllTopics().Result;
        }
        
        [HttpGet("Topics/Titles")]
        public List<string> TopicsTitles()
        {
            return _topicService.GetAllTopicsTitles().Result;
        }
        
        [HttpGet("Posts/Date/Asc")]
        public List<Post> PostsDateAsc()
        {
            return _postService.GetAllPostAscByDate().Result;
        }
        
        [HttpGet("Posts/Date/Desc")]
        public List<Post> PostsDateDesc()
        {
            var postDataAsc = _postService.GetAllPostAscByDate().Result;
            postDataAsc.Reverse();
            return postDataAsc;
        }

        [HttpGet("Comments/{postId}")]

        public List<Comment> Comments(int postId)
        {
            return _commentService.GetCommentsByPostId(postId).Result;
        }

        [HttpGet("PostDetails/{id}")]
        public Post GetPostByPostId(int id)
        {
            return _postService.GetPostByPostId(id).Result;
        }

        [Authorize]
        [HttpPost("Posts/{topicName}")]
        public async Task<ActionResult> AddPost(string topicName, Post post)
        {
            AppUser user = await _userManager.GetUserAsync(HttpContext.User);
            post.User = user;
            post.DateTime = DateTime.Now;
            await _postService.AddPost(topicName, post,_topicService);

            return StatusCode(200);
        }

        
        [HttpPost("PostDetails/{id}")]
        public async Task<ActionResult> AddCommentToPost(int id, Comment comment)
        {
            AppUser user = _userManager.GetUserAsync(HttpContext.User).Result;
            comment.DateTime = DateTime.Now;
            await _commentService.AddComment(id, comment, user, _postService);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPut("Like/{commentId}")]
        public async Task<ActionResult> LikeComment(int commentId)
        {
            await _commentService.LikeComment(commentId);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPut("DisLike/{commentId}")]
        public async Task<ActionResult> DisLikeComment(int commentId)
        {
            await _commentService.DisLikeComment(commentId);

            return StatusCode(200);
        }

        [HttpGet("Search/{searchPhrase}")]

        public List<Post> Comments([FromRoute] string searchPhrase)
        {
            return _postService.GetPostsBySearchPhrase(searchPhrase).Result;
        }

        [Authorize]
        [HttpDelete("DeleteComment/{commentId}")]
        public async Task DeleteCommentById(int commentId)
        {
            await _commentService.DeleteCommentById(commentId);
        }

        [Authorize]
        [HttpDelete("DeletePost/{postId}")]
        public async Task DeletePostById(int postId)
        {
            await _postService.DeletePostById(postId, _commentService);
        }
        
        // [Authorize]
        [HttpDelete("DeleteTopic/{topicId}")]
        public async Task DeleteTopicById(int topicId)
        {
            await _topicService.DeleteTopicById(topicId, _postService, _commentService);
        }

        [Authorize]
        [HttpPut("PostDetails/{id}")]
        public async Task<ActionResult> UpdatePost(int id, Post post)
        {
            await _postService.UpdatePost(id, post);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPut("Comments/{id}")]
        public async Task<ActionResult> UpdateComment(int id, Comment comment)
        {
            await _commentService.UpdateComment(id, comment);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPut("Topics/{id}")]
        public async Task<ActionResult> UpdateTopic(int id, Topic topic)
        {
            await _topicService.UpdateTopic(id, topic);

            return StatusCode(200);
        }
        
        [HttpGet("Comment/{commentId}")]

        public Comment? CommentById(int commentId)
        {
            return _commentService.GetCommentById(commentId).Result;
        }

        [HttpGet("Topics/{topicId}")]
        public Topic? TopicById(int topicId)
        {
            return _topicService.GetTopicById(topicId).Result;
        }


    }
}

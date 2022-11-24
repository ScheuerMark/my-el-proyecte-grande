using System.Net;
using Forum.Data;
using Forum.Models;
using Forum.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers
{
    [Route("api/Home/")]
    [ApiController]
    public class ApiHomeController : ControllerBase
    {
        private readonly ILogger<ApiHomeController> _logger;

        public SqlService SqlService { get; set; }

        public ApiHomeController(ILogger<ApiHomeController> logger, SqlService sqlService)
        {
            _logger = logger;
            SqlService = sqlService;
        }

        [HttpGet("Posts/{topicName}")]
        public List<Post> Posts(string topicName)
        {
            return SqlService.GetPostsByTopicTitle(topicName).Result;
        }
        
        [HttpGet("Topics/")]
        public List<Topic> Topics()
        {
            return SqlService.GetAllTopics().Result;
        }
        
        [HttpGet("Topics/Titles")]
        public List<string> TopicsTitles()
        {
            return SqlService.GetAllTopicsTitles().Result;
        }
        
        [HttpGet("Posts/Date/Asc")]
        public List<Post> PostsDateAsc()
        {
            return SqlService.GetAllPostAscByDate().Result;
        }
        
        [HttpGet("Posts/Date/Desc")]
        public List<Post> PostsDateDesc()
        {
            return SqlService.GetAllPostAscByDate().Result;
        }

        [HttpGet("Comments/{postId}")]

        public List<Comment> Comments(int postId)
        {
            return SqlService.GetCommentsByPostId(postId).Result;
        }

        [HttpGet("PostDetails/{id}")]
        public Post GetPostByPostId(int id)
        {
            return SqlService.GetPostByPostId(id).Result;
        }

        [Authorize]
        [HttpPost("Posts/{topicName}")]
        public async Task<ActionResult> AddPost(string topicName, Post post)
        {
            await SqlService.AddPost(topicName, post);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPost("PostDetails/{id}")]
        public async Task<ActionResult> AddCommentToPost(int id, Comment comment)
        {
            await SqlService.AddComment(id, comment);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPut("Like/{commentId}")]
        public async Task<ActionResult> LikeComment(int commentId)
        {
            await SqlService.LikeComment(commentId);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPut("DisLike/{commentId}")]
        public async Task<ActionResult> DisLikeComment(int commentId)
        {
            await SqlService.DisLikeComment(commentId);

            return StatusCode(200);
        }

        [HttpGet("Search/{searchPhrase}")]

        public List<Post> Comments([FromRoute] string searchPhrase)
        {
            return SqlService.GetPostsBySearchPhrase(searchPhrase).Result;
        }

        [Authorize]
        [HttpDelete("DeleteComment/{commentId}")]
        public async Task DeleteCommentById(int commentId)
        {
            await SqlService.DeleteCommentById(commentId);
        }

        [Authorize]
        [HttpDelete("DeletePost/{postId}")]
        public async Task DeletePostById(int postId)
        {
            await SqlService.DeletePostById(postId);
        }

        [Authorize]
        [HttpPut("PostDetails/{id}")]
        public async Task<ActionResult> UpdatePost(int id, Post post)
        {
            await SqlService.UpdatePost(id, post);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPut("Comments/{id}")]
        public async Task<ActionResult> UpdateComment(int id, Comment comment)
        {
            await SqlService.UpdateComment(id, comment);

            return StatusCode(200);
        }

        [Authorize]
        [HttpPut("Topics/{id}")]
        public async Task<ActionResult> UpdateTopic(int id, Topic topic)
        {
            await SqlService.UpdateTopic(id, topic);

            return StatusCode(200);
        }
        
        [HttpGet("Comment/{commentId}")]

        public Comment? CommentById(int commentId)
        {
            return SqlService.GetCommentById(commentId).Result;
        }

        [HttpGet("Topics/{topicId}")]
        public Topic? TopicById(int topicId)
        {
            return SqlService.GetTopicById(topicId).Result;
        }

    }
}

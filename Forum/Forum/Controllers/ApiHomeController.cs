using Forum.Daos.Implementations;
using Forum.Models;
using Forum.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers
{
    [Route("api/Home/")]
    [ApiController]
    public class ApiHomeController : ControllerBase
    {
        private readonly ILogger<ApiHomeController> _logger;

        public PostService PostService { get; set; }

        public ApiHomeController(ILogger<ApiHomeController> logger)
        {
            _logger = logger;
            PostService = new PostService(PostDaoMemory.GetInstance(), TopicDaoMemory.GetInstance());
        }

        [HttpGet("Posts/{topicName}")]
        public List<Post> Posts(string topicName)
        {
            return PostService.GetPostsByTopicTitle(topicName).ToList();
        }
        
        [HttpGet("Topics/")]
        public List<Topic> Topics()
        {
            return PostService.GetAllTopics().ToList();
        }
        
        [HttpGet("Topics/Titles")]
        public List<string> TopicsTitles()
        {
            return PostService.GetAllTopicsTitles().ToList();
        }
        
        [HttpGet("Posts/Date/Asc")]
        public List<Post> PostsDateAsc()
        {
            return PostService.GetAllPostAscByDate().ToList();
        }
        
        [HttpGet("Posts/Date/Desc")]
        public List<Post> PostsDateDesc()
        {
            return PostService.GetAllPostAscByDate().ToList();
        }

        [HttpGet("Comments/{postId}")]

        public List<Comment> Comments(int postId)
        {
            return PostService.GetCommentsByPostId(postId).ToList();
        }

        [HttpGet("PostDetails/{id}")]
        public Post GetPostByPostId(int id)
        {
            return PostService.GetPostByPostId(id);
        }

        [HttpPost("Posts/{topicName}")]
        public void AddPost(string topicName, Post post)
        {
            PostService.AddPost(topicName, post);
        }

        [HttpPost("PostDetails/{id}")]
        public void AddCommentToPost(int id, Comment comment)
        {
            PostService.AddComment(id, comment);
        }

        [HttpPut("Like/{commentId}")]
        public void LikeComment(int commentId)
        {
            PostService.LikeComment(commentId);
        }

        [HttpPut("DisLike/{commentId}")]
        public void DisLikeComment(int commentId)
        {
            PostService.DisLikeComment(commentId);
        }

    }
}

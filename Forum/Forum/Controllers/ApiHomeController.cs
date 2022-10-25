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

        //Return Topics

        //Return All Posts (date ordered)

        //Return Comments for a Post(id)
        [HttpGet("PostDetails/{id}")]
        public Post GetPostByPostId(int id)
        {
            return PostService.GetPostById(id);
        }

        //Add Post (Post)
        [HttpPost("Posts/{topicName}")]
        public void AddPost(string topicName, Post post)
        {
            PostService.AddPost(topicName, post);
        }
        //Add Comment (Post)
        [HttpPost("PostDetails/{id}")]
        public void AddCommentToPost(int id, Comment comment)
        {
            PostService.AddComment(id, comment);
        }

    }
}

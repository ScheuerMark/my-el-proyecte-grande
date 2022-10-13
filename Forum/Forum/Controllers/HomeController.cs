using System.Diagnostics;
using Forum.Daos.Implementations;
using Microsoft.AspNetCore.Mvc;
using Forum.Models;
using Forum.Services;

namespace Forum.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    
    public PostService PostService { get; set; }

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
        PostService = new PostService(PostDaoMemory.GetInstance(), TopicDaoMemory.GetInstance());
    }

    public IActionResult Index()
    {
        ViewBag.topics = PostService.GetAllTopics();
        ViewBag.posts = PostService.GetAllPosts();
        return View();
    }

    public IActionResult Posts(string topicName)
    {
        ViewBag.topics = PostService.GetAllTopics();
        ViewBag.Searched = topicName;
        ViewBag.posts = PostService.GetPostsByTopicTitle(topicName);
        return View();
    }

    public IActionResult PostDetails(string postName)
    {
        ViewBag.post = PostService.GetPostByPostTitle(postName);
        ViewBag.comments = PostService.GetCommentsByPostTitle(postName);
        ViewBag.topics = PostService.GetAllTopics();
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
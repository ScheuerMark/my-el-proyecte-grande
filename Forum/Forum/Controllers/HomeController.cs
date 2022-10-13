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
        var topics = PostService.GetAllTopics();
        var posts = PostService.GetAllPosts();
        ViewBag.topics = topics;
        ViewBag.posts = posts;
        return View();
    }

    public IActionResult Posts(string topicName)
    {
        var topics = PostService.GetAllTopics();
        ViewBag.topics = topics;
        ViewBag.Searched = topicName;
        return View();
    }

    public IActionResult PostDetails(string postName)
    {
        var topics = PostService.GetAllTopics();
        ViewBag.topics = topics;
        ViewBag.postName = postName;
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
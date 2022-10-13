using Forum.Daos.Implementations;
using Forum.Models;
using Forum.Services;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers;

public class Account : Controller
{
    public Account()
    {
        PostService = new PostService(PostDaoMemory.GetInstance(), TopicDaoMemory.GetInstance());
    }

    public PostService PostService { get; set; }
    // GET
    public IActionResult Register()
    {
       ViewBag.topics = PostService.GetAllTopics();
        return View();
    }

    public IActionResult Login(string returnUrl = "")
    {
        ViewBag.topics = PostService.GetAllTopics();
        var model = new LoginViewModel { ReturnUrl = returnUrl }; 
        return View(model);
    }
}
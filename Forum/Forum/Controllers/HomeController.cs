using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Forum.Models;

namespace Forum.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Posts(string topicName)
    {
        ViewBag.Searched = topicName;
        return View();
    }

    public IActionResult PostDetails(string postName)
    {
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
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers;

public class Account : Controller
{
    // GET
    public IActionResult Register()
    {
        return View();
    }

    public IActionResult Login()
    {
        return View();
    }
}
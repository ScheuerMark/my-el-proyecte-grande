using Forum.Models;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers;

public class Account : Controller
{
    // GET
    public IActionResult Register()
    {
        return View();
    }

    public IActionResult Login(string returnUrl = "")
    {
        var model = new LoginViewModel { ReturnUrl = returnUrl }; 
        return View(model);
    }
}
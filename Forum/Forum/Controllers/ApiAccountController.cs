using Forum.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers;

[Route("api/Account/")]
[ApiController]
[Authorize]
public class ApiAccountController : ControllerBase
{
    private UserManager<AppUser> _userManager;
    private SignInManager<AppUser> signInManager;
 
    public ApiAccountController(UserManager<AppUser> userMgr, SignInManager<AppUser> signinMgr)
    {
        _userManager = userMgr;
        signInManager = signinMgr;
    }

    [HttpPost("Login")]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(Login login)
    {
        AppUser appUser = await _userManager.FindByEmailAsync(login.Email);
        if (appUser != null)
        {
            await signInManager.SignOutAsync();
            Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(appUser, login.Password, false, false);
            if (result.Succeeded)
                return StatusCode(200);
        }
        return StatusCode(401, "Login Failed: Invalid Email or password");
    }
}
using Forum.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers;

[Route("api/Admin/")]
[ApiController]
public class ApiAdminController : ControllerBase
{
    private UserManager<AppUser> _userManager;
 
    public ApiAdminController(UserManager<AppUser> usrMgr)
    {
        _userManager = usrMgr;
    }
    
    [HttpPost("Registration")]
    public async Task<IActionResult> Create(User user)
    {
        AppUser appUser = new AppUser
        {
            UserName = user.Name,
            Email = user.Email
        };

        IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);

        if (result.Succeeded)
            return StatusCode(201);

        return StatusCode(500, result.Errors);
    }
}
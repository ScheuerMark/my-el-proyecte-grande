using Forum.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Forum.Models.IdentityHelper;

namespace Forum.Controllers;

[Route("api/Account/")]
[ApiController]
[Authorize]
public class ApiAccountController : ControllerBase
{
    private UserManager<AppUser> _userManager;
    
    private SignInManager<AppUser> signInManager;
    
    private IPasswordHasher<AppUser> _passwordHasher;
 
    public ApiAccountController(UserManager<AppUser> userMgr, SignInManager<AppUser> signinMgr, IPasswordHasher<AppUser> passwordHash)
    {
        _userManager = userMgr;
        signInManager = signinMgr;
        _passwordHasher = passwordHash;
    }
    
    [AllowAnonymous]
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
            return StatusCode(201, result.Succeeded);

        return StatusCode(500, result.Errors);
    }
    
    [HttpPost("Login")]
    [AllowAnonymous]
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
    
    [HttpGet("Logout")]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return StatusCode(200);
    }
    
    [HttpGet("LoggedIn")]
    [AllowAnonymous]
    public async Task<AppUser> LoggedInUser()
    {
        AppUser user = await _userManager.GetUserAsync(HttpContext.User);
        return user;
    }

    [HttpGet("Roles")]
    [Authorize]
    public async Task<List<string>> RolesForLoggedInUser()
    {
        AppUser user = await _userManager.GetUserAsync(HttpContext.User);

        return _userManager.GetRolesAsync(user).Result.ToList();
    }

    [HttpGet("Update")]
    public async Task<AppUser> Update()
    {
        AppUser user = await _userManager.GetUserAsync(HttpContext.User);
        user = await _userManager.FindByIdAsync(user.Id);
        return user;
        // status code 204 (no content) in case user is not found.
    }
 
    [HttpPut("Update")]
    public async Task<AppUser> Update(UpdateUser userData)
    {
        string name = userData.name;
        string email = userData.email;
        string password = userData.password;
        AppUser user = await _userManager.GetUserAsync(HttpContext.User);
        
        if (user != null)
        {
            if (!string.IsNullOrEmpty(name))
            {
                user.UserName = name;
            }
            if (!string.IsNullOrEmpty(email))
                user.Email = email;

            if (!string.IsNullOrEmpty(password))
                user.PasswordHash = _passwordHasher.HashPassword(user, password);

            if (!string.IsNullOrEmpty(name) || !string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(password))
            {
                IdentityResult result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                    return user;
            }
        }
        return user;
        // status code 204 (no content) in case user is not found.
    }
    
    [HttpPost("Delete")]
    public async Task<AppUser> Delete()
    {
        AppUser user = await _userManager.GetUserAsync(HttpContext.User);
        if (user != null)
        {
            IdentityResult result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
                return user;
        }

        return user;
        // status code 204 (no content) in case user is not found.
    }

    [HttpGet("Access")]
    [Authorize]
    public async Task<ActionAccess> Access()
    {
        var roles = await _userManager.GetRolesAsync(await _userManager.GetUserAsync(HttpContext.User));
        ActionAccess access = new ActionAccess();

        access.Access["AddTopic"] = roles.Contains("Admin");
        access.Access["DeleteTopic"] = roles.Contains("Admin");

        access.Access["AddPost"] = new[] { "Admin", "User" }.Any(c => roles.Contains(c));
        access.Access["AddComment"] = new[] { "Admin", "User" }.Any(c => roles.Contains(c));
        access.Access["DeletePost"] = new[] { "Admin", "User" }.Any(c => roles.Contains(c));
        access.Access["DeleteComment"] = new[] { "Admin", "User" }.Any(c => roles.Contains(c));

        return access;
    }





}
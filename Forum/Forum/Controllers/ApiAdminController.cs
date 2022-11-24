using System.Xml;
using Forum.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers;

// [Authorize(Roles = "admin")]
[Route("api/Admin/")]
[Authorize(Roles = "Admin")]
[ApiController]
public class ApiAdminController : ControllerBase
{
    private UserManager<AppUser> _userManager;
    
    private IPasswordHasher<AppUser> _passwordHasher;
 
    public ApiAdminController(UserManager<AppUser> usrMgr, IPasswordHasher<AppUser> passwordHash)
    {
        _userManager = usrMgr;
        _passwordHasher = passwordHash;
    }
    
    [HttpGet("")]
    public List<AppUser> Index()
    {
        return _userManager.Users.ToList();
    }
    
    [HttpGet("Update/{id}")]
    public async Task<AppUser> Update(string id)
    {
        AppUser user = await _userManager.FindByIdAsync(id);
        return user;
        // status code 204 (no content) in case user is not found.
    }
    
    [HttpPost("Update")]
    public async Task<AppUser> Update(Update update)
    {
        string id = update.id;
        string email = update.email;
        string password = update.password;
        AppUser user = await _userManager.FindByIdAsync(id);
        
        if (user != null)
        {
            if (!string.IsNullOrEmpty(email))
                user.Email = email;

            if (!string.IsNullOrEmpty(password))
                user.PasswordHash = _passwordHasher.HashPassword(user, password);

            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
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
    public async Task<AppUser> Delete(UserId userId)
    {
        AppUser user = await _userManager.FindByIdAsync(userId.Id);
        if (user != null)
        {
            IdentityResult result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
                return user;
        }

        return user;
        // status code 204 (no content) in case user is not found.
    }
}
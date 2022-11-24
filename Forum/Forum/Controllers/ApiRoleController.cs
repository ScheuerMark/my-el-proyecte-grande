using System.ComponentModel.DataAnnotations;
using Forum.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Forum.Controllers;

// [Authorize(Roles = "Admin")]
[Route("api/Role/")]
[ApiController]
public class ApiRoleController : ControllerBase
{
    private RoleManager<IdentityRole> _roleManager;
    private UserManager<AppUser> _userManager;
    
    public ApiRoleController(RoleManager<IdentityRole> roleMgr, UserManager<AppUser> userManager)
    {
        _roleManager = roleMgr;
        _userManager = userManager;
    }
    
    [HttpGet("")]
    public List<IdentityRole> Index() => _roleManager.Roles.ToList();

    [HttpPost("Create")]
    public async Task<IdentityResult> Create(RoleName roleName)
    {
        IdentityResult result = await _roleManager.CreateAsync(new IdentityRole(roleName.Name));
        return result;
    }
    
    [HttpPost("Delete")]
    public async Task<IdentityResult> Delete(RoleId roleId)
    {
        IdentityRole role = await _roleManager.FindByIdAsync(roleId.Id);
        IdentityResult result = new IdentityResult();
        if (role != null)
        {
            result = await _roleManager.DeleteAsync(role);
        }
        return result;
    }
    
    [HttpGet("Update/{id}")]
    public async Task<RoleEdit> Update(string id)
    {
        IdentityRole role = await _roleManager.FindByIdAsync(id);
        List<AppUser> members = new List<AppUser>();
        List<AppUser> nonMembers = new List<AppUser>();
        foreach (AppUser user in _userManager.Users)
        {
            var list = await _userManager.IsInRoleAsync(user, role.Name) ? members : nonMembers;
            list.Add(user);
        }
        return new RoleEdit
        {
            Role = role,
            Members = members,
            NonMembers = nonMembers
        };
    }
    
    [HttpPost("Update")]
    public async Task<RoleEdit> Update(RoleModification model)
    {
        foreach (string userId in model.AddIds ?? new string[] { })
        {
            AppUser user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                await _userManager.AddToRoleAsync(user, model.RoleName);
            }
        }
        foreach (string userId in model.DeleteIds ?? new string[] { })
        {
            AppUser user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                await _userManager.RemoveFromRoleAsync(user, model.RoleName);
            }
        }
        return await Update(model.RoleId);
    }
}
using System.ComponentModel.DataAnnotations;

namespace Forum.Models;

public class RoleId
{
    [Required]
    public string Id { get; set; }
}
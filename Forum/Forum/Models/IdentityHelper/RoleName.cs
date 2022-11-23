using System.ComponentModel.DataAnnotations;

namespace Forum.Models;

public class RoleName
{
    [Required]
    public string Name { get; set; }
}
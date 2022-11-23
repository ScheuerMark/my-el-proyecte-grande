using System.ComponentModel.DataAnnotations;

namespace Forum.Models;

public class UserId
{
    [Required]
    public string Id { get; set; }
}
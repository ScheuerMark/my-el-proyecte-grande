using System.ComponentModel.DataAnnotations;

namespace Forum.Models;

public class Update
{
    [Required]
    public string id { get; set; }
    
    [Required]
    [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
    public string email { get; set; }
    
    [Required]
    public string password { get; set; }
}
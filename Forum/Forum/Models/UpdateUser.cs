using System.ComponentModel.DataAnnotations;

namespace Forum.Models;

public class UpdateUser
{
    
    public string name { get; set; }
    
    [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
    public string email { get; set; }
    
    public string password { get; set; }
}
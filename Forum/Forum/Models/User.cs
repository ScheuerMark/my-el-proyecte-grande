using System.ComponentModel.DataAnnotations.Schema;

namespace Forum.Models;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }


}
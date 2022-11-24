using System.ComponentModel.DataAnnotations.Schema;
namespace Forum.Models;

public class Comment
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Message { get; set; }
    public int Like { get; set; }
    public int DisLike { get; set; }
    public AppUser User { get; set; }
    public DateTime DateTime { get; set; }
}
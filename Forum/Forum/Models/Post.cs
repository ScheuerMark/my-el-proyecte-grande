using System.ComponentModel.DataAnnotations.Schema;
using System.Xml;

namespace Forum.Models;

public class Post
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public DateTime DateTime { get; set; }
    
    public string Title { get; set; }
    
    public string Message { get; set; }

    public HashSet<Comment> Comments { get; set; } = new HashSet<Comment>();

    public HashSet<AppUser> Followers { get; set; } = new HashSet<AppUser>();
    
    public Comment? Solution { get; set; }

    public AppUser? User { get; set; }

    public int NumberOfComments => Comments.Count;

    public int NumberOfFollowers => Followers.Count;
}
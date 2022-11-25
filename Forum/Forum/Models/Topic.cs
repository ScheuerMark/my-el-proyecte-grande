using System.ComponentModel.DataAnnotations.Schema;

namespace Forum.Models;

public class Topic
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public HashSet<Post> Posts { get; set; }=new HashSet<Post>();

    public AppUser? User { get; set; }

    public int NumberOfPosts => Posts.Count;
}
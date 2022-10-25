using System.Xml;

namespace Forum.Models;

public class Post
{
    public int Id { get; set; }
    
    public DateTime DateTime => DateTime.Now;
    
    public string Title { get; set; }
    
    public string Message { get; set; }
    
    public HashSet<Comment> Comments { get; set; }
    
    public HashSet<User> Followers { get; set; }
    
    public Comment Solution { get; set; }

    public int NumberOfComments => Comments.Count;

    public int NumberOfFollowers => Followers.Count;
}
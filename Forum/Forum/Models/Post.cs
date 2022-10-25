using System.Xml;

namespace Forum.Models;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    
    public string Message { get; set; }
    
    public HashSet<Comment>? Comments { get; set; }
    
    public HashSet<User>? Followers { get; set; }
    
    public Comment? Solution { get; set; }

    public int NumberOfComments
    {
        get => Comments.Count;
        set => NumberOfComments = value;
    }

    public int NumberOfFollowers
    {
        get => Followers.Count;
        set => NumberOfFollowers = value;
    }
}
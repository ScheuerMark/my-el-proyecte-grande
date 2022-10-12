namespace Forum.Models;

public class Topic
{
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public HashSet<Post> Posts { get; set; }

    public int NumberOfPosts => Posts.Count;
}
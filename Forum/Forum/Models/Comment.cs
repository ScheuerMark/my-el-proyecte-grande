namespace Forum.Models;

public class Comment
{
    public int Id { get; set; }
    public string Message { get; set; }
    public int Like { get; set; }
    public int DisLike { get; set; }

    public DateTime DateTime => DateTime.Now;
}
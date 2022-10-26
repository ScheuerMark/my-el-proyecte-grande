namespace Forum.Models;

public class Comment
{
    public int Id { get; set; }
    public string Message { get; set; }

    public DateTime DateTime => DateTime.Now;
}
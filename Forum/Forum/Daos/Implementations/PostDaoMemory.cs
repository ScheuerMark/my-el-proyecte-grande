using Forum.Models;

namespace Forum.Daos.Implementations;

public class PostDaoMemory : IPostDao
{
    private List<Post> posts = new List<Post>();
    private static PostDaoMemory instance = null;

    private PostDaoMemory()
    {
    }

    public static PostDaoMemory GetInstance()
    {
        if (instance == null)
        {
            instance = new PostDaoMemory();
        }

        return instance;
    }

    public void Add(Post post)
    {
        posts.Add(post);
    }

    public void Remove(Post post)
    {
        posts.Remove(post);
    }

    public IEnumerable<Post> GetAll()
    {
        return posts;
    }
}
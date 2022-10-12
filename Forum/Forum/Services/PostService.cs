using Forum.Daos.Implementations;
using Forum.Models;

namespace Forum.Services;

public class PostService
{
    private readonly PostDaoMemory postDao;
    private readonly TopicDaoMemory topicDao;

    public PostService(PostDaoMemory postDao, TopicDaoMemory topicDao)
    {
        this.postDao = postDao;
        this.topicDao = topicDao;
    }

    public IEnumerable<Post> GetAllPosts()
    {
        return postDao.GetAll();
    }

    public IEnumerable<Topic> GetAllTopics()
    {
        return topicDao.GetAll();
    }

    public Post GetPostWithMostComments()
    {
        var posts = postDao.GetAll();
        return posts.OrderByDescending(x => x.NumberOfComments).First();
    }
    
    public Post GetPostWithLeastComments()
    {
        var posts = postDao.GetAll();
        return posts.OrderBy(x => x.NumberOfComments).First();
    }
}
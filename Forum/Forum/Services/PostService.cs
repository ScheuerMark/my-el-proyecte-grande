using Forum.Daos.Implementations;

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
}
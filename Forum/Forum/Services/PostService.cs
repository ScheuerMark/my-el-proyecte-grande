using Forum.Daos.Implementations;

namespace Forum.Services;

public class PostService
{
    public class ProductService
    {
        private readonly PostDaoMemory postDao;
        private readonly TopicDaoMemory topicDaoMemory;

        public ProductService(PostDaoMemory postDao, TopicDaoMemory topicDaoMemory)
        {
            this.postDao = postDao;
            this.topicDaoMemory = topicDaoMemory;
        }
    }
}
using Forum.Models;

namespace Forum.Daos.Implementations;

public class TopicDaoMemory : ITopicDao
{
    private List<Topic> topics = new List<Topic>();
    private static TopicDaoMemory instance = null;

    private TopicDaoMemory()
    {
    }

    public static TopicDaoMemory GetInstance()
    {
        if (instance == null)
        {
            instance = new TopicDaoMemory();
        }

        return instance;
    }

    public void Add(Topic topic)
    {
        topics.Add(topic);
    }

    public void Remove(Topic topic)
    {
        topics.Remove(topic);
    }

    public IEnumerable<Topic> GetAll()
    {
        return topics;
    }

    public Topic GetTopic(string title)
    {
        return topics.Where(topic => topic.Title == title).FirstOrDefault();
    }
}
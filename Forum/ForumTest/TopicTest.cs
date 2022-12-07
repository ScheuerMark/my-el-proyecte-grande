using Forum.Services;
using NUnit.Framework;

namespace ForumTest;

[TestFixture]
public class TopicTest : TestBase
{
    private TopicService _topicService;
    
    [SetUp]
    public new void Setup()
    {
        base.Setup();
        _topicService = new TopicService(_forumContext);
    }

    [Test]
    public void TestGetAllTopics()
    {
        
    }
}
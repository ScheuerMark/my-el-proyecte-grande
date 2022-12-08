using System.Text.Json;
using Forum.Models;
using Forum.Services;
using NUnit.Framework;

namespace ForumTest;

[TestFixture]
public class TopicTest : TestBase
{
    private TopicService _topicService;
    private CommentService _commentService;
    private PostService _postService;
    
    [SetUp]
    public new void Setup()
    {
        base.Setup();
        _topicService = new TopicService(_forumContext);
        _commentService = new CommentService(_forumContext);
        _postService = new PostService(_forumContext);
    }

    [Test]
    public void TestGetAllTopics()
    {
        AppUser? admin = null;
        var topics = new List<Topic>()
        {
            new Topic()
            {
                Id = 1,
                Title = "Accident",
                Description =
                    "This topic is thought to share your thought regarding accidents happened with the child. Share your experiences and doubts.",
                Posts = new HashSet<Post>(),
                User = admin
            },
            new Topic()
            {
                Id = 2,
                Title = "Wandering",
                Description = "Let's talk about a bit how to spend the time in the nature with your family.",
                Posts = new HashSet<Post>(),
                User = admin
            },
            new Topic()
            {
                Id = 3,
                Title = "Play around",
                Description = "This topic is about toys, games and everything which makes for the kids fun.",
                Posts = new HashSet<Post>(),
                User = admin
            },
            new Topic()
            {
                Id = 4, 
                Title = "Eating habits",
                Description = "Everything about meal and eating habits",
                Posts = new HashSet<Post>(),
                User = admin
            }
        };
        
        List<Post> posts = new List<Post>()
            {
                new Post()
                {
                    Id = 1,
                    Title = "Battery in throat",
                    Message =
                        "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
                    Comments = new HashSet<Comment>(),
                    Followers = new HashSet<AppUser>(),
                    User = admin
                },
                new Post()
                {
                    Id = 2,
                    Title = "Rainy weather",
                    Message =
                        "This weekend is it is going to be cloudy with plenty of rains. Any idea what to do? Where to go?",
                    Comments = new HashSet<Comment>(),
                    Followers = new HashSet<AppUser>(),
                    User = admin
                }
            };

        List<Comment> comments = new List<Comment>()
            {
                new Comment()
                {
                    Id = 1,
                    Message = "It is better to go to the hospital",
                    Like = 3,
                    DisLike = 0,
                    User = admin
                },
                new Comment()
                {
                    Id = 2,
                    Message = "It seems quite bad. Maybe it is time to stay home.",
                    Like = 0,
                    DisLike = 0,
                    User = admin
                },
                new Comment()
                {
                    Id = 3,
                    Message =
                        "Well, visiting some caves is always a good idea even if it is reining inside the cave you will not recognize it.",
                    Like = 0,
                    DisLike = 0,
                    User = admin
                },
            };

        posts[0].Comments.Add(comments[0]);
        posts[1].Comments.Add(comments[1]);
        posts[1].Comments.Add(comments[2]);

        topics[0].Posts.Add(posts[0]);
        topics[1].Posts.Add(posts[1]);

        var expected = JsonSerializer.Serialize(topics);
        
        var actual = JsonSerializer.Serialize(_topicService.GetAllTopics().Result);
        
        Assert.AreEqual(expected, actual);
    }

    [Test]
    public void TestGetAllTopictitles()
    {
        List<string> expected = new List<string>()
        {

            "Accident",
            "Wandering",
            "Play around",
            "Eating habits"
        };
        var actual = _topicService.GetAllTopicsTitles().Result;
        
        CollectionAssert.AreEqual(expected, actual);
    }

    [Test]
    public void TestGetTopicByTitle()
    {
        AppUser? admin = null;
        var topicTest = new Topic()
        {

            Id = 1,
            Title = "Accident",
            Description =
                "This topic is thought to share your thought regarding accidents happened with the child. Share your experiences and doubts.",
            Posts = new HashSet<Post>(),
            User = admin
        };
        topicTest.Posts.Add(new Post()
        {
            Id = 1,
            Title = "Battery in throat",
            Message =
                "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
            Comments = new HashSet<Comment>()
            {
                new Comment()
                {
                    Id = 1,
                    Message = "It is better to go to the hospital",
                    Like = 3,
                    DisLike = 0,
                    User = admin
                }
            },
            Followers = new HashSet<AppUser>(),
            User = admin
        });
        var expected = JsonSerializer.Serialize(topicTest);
        var actual = JsonSerializer.Serialize(_topicService.GetTopicByTitle("Accident").Result);
        
        StringAssert.AreEqualIgnoringCase(expected, actual);
    }

    [Test]
    public void TestNotGetTopicByWrongTitle()
    {
      Assert.IsNull(_topicService.GetTopicByTitle("Adent").Result);
    }

    [Test]
    public void TestGetTopicById()
    {
        AppUser? admin = null;
        var topicTest = new Topic()
        {

            Id = 1,
            Title = "Accident",
            Description =
                "This topic is thought to share your thought regarding accidents happened with the child. Share your experiences and doubts.",
            Posts = new HashSet<Post>(),
            User = admin
        };
        topicTest.Posts.Add(new Post()
        {
            Id = 1,
            Title = "Battery in throat",
            Message =
                "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
            Comments = new HashSet<Comment>()
            {
                new Comment()
                {
                    Id = 1,
                    Message = "It is better to go to the hospital",
                    Like = 3,
                    DisLike = 0,
                    User = admin
                }
            },
            Followers = new HashSet<AppUser>(),
            User = admin
        });
        var expected = JsonSerializer.Serialize(topicTest);
        var actual = JsonSerializer.Serialize(_topicService.GetTopicById(1).Result);
        
        StringAssert.AreEqualIgnoringCase(expected, actual);
    }
    
    [Test]
    public void TestNotGetTopicByWrongId()
    {
        Assert.IsNull(_topicService.GetTopicById(10).Result);
    }

    [Test]
    public async Task TestUpdateTopic()
    {
        AppUser? admin = null;
        Topic updatedTopic = new Topic()
        {
            Id = 4,
            Title = "Eating habits",
            Description = "Everything about meat",
            Posts = new HashSet<Post>(),
            User = admin
        };
        await _topicService.UpdateTopic(4, updatedTopic);

        var expected = JsonSerializer.Serialize(updatedTopic);
        var actual = JsonSerializer.Serialize(_topicService.GetTopicById(4).Result);
        
        StringAssert.AreEqualIgnoringCase(expected, actual);

    }

    [Test]
    public async Task TestDeleteTopic()
    {
        await _topicService.DeleteTopicById(4, _postService, _commentService);
        
        Assert.IsNull(_topicService.GetTopicById(4).Result);

    }
}
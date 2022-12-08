using Forum.Models;
using Forum.Services;
using Forum.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Internal;
using NSubstitute;

namespace ForumTest;

public class PostTest : TestBase
{
    private PostService _postService;
    private TopicService _topicService;


    [SetUp]
    public new void Setup()
    {
        base.Setup();
        _postService = new PostService(_forumContext);
        _topicService = Substitute.For<TopicService>(_forumContext);
    }

    [Test]
    public async Task TestGetAllPostAscByDate()
    {
        var result = await _postService.GetAllPostAscByDate();

        var expectedResult = new List<Post>
        {
            new Post
            {
                Id = 1,
                Title = "Battery in throat",
                Message = "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
                Comments = new HashSet<Comment>
                {
                    new Comment
                    {
                        Id = 1,
                        Message = "It is better to go to the hospital",
                        Like = 3,
                        DisLike = 0,
                        User = null
                    }
                },
                Followers = new HashSet<AppUser>(),
                User = null
            },
            new Post
            {
                Id = 2,
                Title = "Rainy weather",
                Message =
                    "This weekend is it is going to be cloudy with plenty of rains. Any idea what to do? Where to go?",
                Comments = new HashSet<Comment>
                {
                    new Comment
                    {
                        Id = 2,
                        Message = "It seems quite bad. Maybe it is time to stay home.",
                        Like = 0,
                        DisLike = 0,
                        User = null
                    },
                    new Comment
                    {
                        Id = 3,
                        Message =
                            "Well, visiting some caves is always a good idea even if it is reining inside the cave you will not recognize it.",
                        Like = 0,
                        DisLike = 0,
                        User = null
                    }
                },
                Followers = new HashSet<AppUser>(),
                User = null
            }
        };
        var expectedJson = JsonSerializer.Serialize(expectedResult);
        var actualJson = JsonSerializer.Serialize(result);
        Assert.AreEqual(expectedJson, actualJson);
    }

    [Test]
    public async Task TestGetPostByPostId_IdExists()
    {
        // Arrange
        var expectedPost = new Post
        {
            Id = 1,
            Title = "Battery in throat",
            Message = "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
            Comments = new HashSet<Comment>
            {
                new Comment
                {
                    Id = 1,
                    Message = "It is better to go to the hospital",
                    Like = 3,
                    DisLike = 0,
                    User = null
                }
            },
            Followers = new HashSet<AppUser>(),
            User = null
        };

        // Act
        var result = await _postService.GetPostByPostId(1);

        // Assert
        var expectedJson = JsonSerializer.Serialize(expectedPost);
        var actualJson = JsonSerializer.Serialize(result);
        Assert.AreEqual(expectedJson, actualJson);
    }

    [Test]
    public async Task TestGetPostByPostId_IdNotExists()
    {
        var nonExistentId = 99;

        var result = await _postService.GetPostByPostId(nonExistentId);

        Assert.IsNull(result);
    }

    [Test]
    public async Task TestGetPostsByTopicTitle()
    {
        var expectedPosts = new List<Post>
        {
            new Post
            {
                Id = 1,
                Title = "Battery in throat",
                Message = "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
                Comments = new HashSet<Comment>
                {
                    new Comment
                    {
                        Id = 1,
                        Message = "It is better to go to the hospital",
                        Like = 3,
                        DisLike = 0,
                        User = null
                    }
                },
                Followers = new HashSet<AppUser>(),
                User = null
            }
        };

        var result = await _postService.GetPostsByTopicTitle("Accident");

        var expectedJson = JsonSerializer.Serialize(expectedPosts);
        var actualJson = JsonSerializer.Serialize(result);
        Assert.AreEqual(expectedJson, actualJson);
    }

    [Test]
    public async Task TestGetPostsByTopicTitle_InvalidTitle()
    {
        var invalidTitle = "Invalid topic title";

        var result = await _postService.GetPostsByTopicTitle(invalidTitle);

        Assert.IsNull(result);
    }

    [Test]
    public async Task TestGetPostsByTopicId_TopicIdExists()
    {
        var topicId = 1;
        var expectedPosts = new List<Post>
        {
            new Post
            {
                Id = 1,
                Title = "Battery in throat",
                Message = "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
                Comments = new HashSet<Comment>
                {
                    new Comment
                    {
                        Id = 1,
                        Message = "It is better to go to the hospital",
                        Like = 3,
                        DisLike = 0,
                        User = null
                    }
                },
                Followers = new HashSet<AppUser>(),
                User = null
            }
        };

        var result = await _postService.GetPostsByTopicId(topicId);

        var expectedJson = JsonSerializer.Serialize(expectedPosts);
        var actualJson = JsonSerializer.Serialize(result);
        Assert.AreEqual(expectedJson, actualJson);
    }

    [Test]
    public async Task TestGetPostsByTopicId_TopicIdNotExists()
    {
        var nonExistentTopicId = 99;

        var result = await _postService.GetPostsByTopicId(nonExistentTopicId);

        Assert.IsNull(result);
    }

    [Test]
    public async Task TestGetPostsBySearchPhrase()
    {
        var searchPhrase = "hospital";
        var expectedPosts = new List<Post>
        {
            new Post
            {
                Id = 1,
                Title = "Battery in throat",
                Message = "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
                Comments = new HashSet<Comment>
                {
                    new Comment
                    {
                        Id = 1,
                        Message = "It is better to go to the hospital",
                        Like = 3,
                        DisLike = 0,
                        User = null
                    }
                },
                Followers = new HashSet<AppUser>(),
                Solution = null
            }
        };

        var result = await _postService.GetPostsBySearchPhrase(searchPhrase);

        var expectedJson = JsonSerializer.Serialize(expectedPosts);
        var actualJson = JsonSerializer.Serialize(result);
        Assert.AreEqual(expectedJson, actualJson);
    }

    [Test]
    public async Task TestGetPostsBySearchPhrase_NoResults()
    {
        var searchPhrase = "xyz123";

        var result = await _postService.GetPostsBySearchPhrase(searchPhrase);

        Assert.IsEmpty(result);
    }

    [Test]
    public async Task TestUpdatePost()
    {
        var postId = 1;
        var updatedPost = new Post
        {
            Title = "Battery in throat - Updated",
            Message =
                "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do? - Updated"
        };
        var expectedPost = new Post
        {
            Id = 1,
            Title = "Battery in throat - Updated",
            Message =
                "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do? - Updated",
            Comments = new HashSet<Comment>
            {
                new Comment
                {
                    Id = 1,
                    Message = "It is better to go to the hospital",
                    Like = 3,
                    DisLike = 0,
                    User = null
                }
            },
            Followers = new HashSet<AppUser>(),
            Solution = null
        };

        await _postService.UpdatePost(postId, updatedPost);
        var result = await GetPostByPostId(postId);

        var expectedJson = JsonSerializer.Serialize(expectedPost);
        var actualJson = JsonSerializer.Serialize(result);
        Assert.AreEqual(expectedJson, actualJson);

    }

    public async Task<Post?> GetPostByPostId(int id)
    {
        return await _forumContext.Posts.Include(x => x.Comments).ThenInclude(y => y.User)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));
    }

    [Test]
    public async Task TestAddPost()
    {
        // Arrange
        var user = new AppUser();
        var topicName = "Weather";
        var post = new Post
        {
            Title = "Snow forecast for next week",
            Message = "It seems like it is going to snow next week. How much snow do you think we will get?",
            Comments = new HashSet<Comment>(),
            Followers = new HashSet<AppUser>(),
            Solution = null,
            User = user
        };
        var expectedPost = new Post
        {
            Id = 3,
            Title = "Snow forecast for next week",
            Message = "It seems like it is going to snow next week. How much snow do you think we will get?",
            Comments = new HashSet<Comment>(),
            Followers = new HashSet<AppUser>(),
            Solution = null,
            User = user
        };


        _topicService.GetTopicByTitle(topicName).Returns(new Topic
        {
            Id = 1
        });
        // Act
        await _postService.AddPost(topicName, post, _topicService);
        var result = await GetPostByPostId(3);

        // Assert
        var expectedJson = JsonSerializer.Serialize(expectedPost);
        var actualJson = JsonSerializer.Serialize(result);
        Assert.AreEqual(expectedJson, actualJson);
    }

    [Test]
    public async Task TestDeletePostById_PostExists()
    {
        // Arrange
        var postId = 5;
        var commentServiceMock = Substitute.For<CommentService>(_forumContext);
        var postToDelete = new Post
        {
            Id = postId,
            Title = "Battery in throat",
            Message = "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
            Comments = new HashSet<Comment>
            {
                new Comment
                {
                    Id = 6,
                    Message = "It is better to go to the hospital",
                    Like = 3,
                    DisLike = 0,
                    User = null
                }
            },
            Followers = new HashSet<AppUser>(),
            User = null
        };
        _forumContext.Posts.Add(postToDelete);
        await _forumContext.SaveChangesAsync();

        commentServiceMock.GetCommentsByPostId(postId).Returns(_forumContext.Posts.FirstOrDefaultAsync(x=>x.Id == postId).Result?.Comments.ToList());

        Assert.IsNotNull(_forumContext.Posts.FindAsync(postId));
        await _postService.DeletePostById(postId, commentServiceMock);

        var actualPost = await _forumContext.Posts.FindAsync(postId);
        var actualComments = _forumContext.Posts.FirstOrDefaultAsync(x => x.Id == postId).Result?.Comments.ToList();
        Assert.IsNull(actualPost);
        Assert.IsNull(actualComments);
    }
}
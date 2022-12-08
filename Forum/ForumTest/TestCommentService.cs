using Forum.Data;
using Forum.Models;
using Forum.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Internal;
using NSubstitute;

namespace ForumTest;

public class Tests : TestBase
{

    private CommentService _commentService;

    private PostService _postService;
    
    [SetUp]
    public new void Setup()
    {
        base.Setup();
        _commentService = new CommentService(_forumContext);
        _postService = Substitute.For<PostService>(_forumContext);
    }

    [Test]
    public void GetCommentById_WithExistingId_ReturnComment()
    {
        Comment comment = new Comment()
        {
            Id = 1,
            Message = "It is better to go to the hospital",
            Like = 3,
            DisLike = 0,
            User = null
        };
        
        var expected = JsonSerializer.Serialize(comment);
        var actual = JsonSerializer.Serialize(_commentService.GetCommentById(1).Result);

        Assert.AreEqual(expected, actual);
    }
    
    [Test]
    public void GetCommentById_WithNotExistingId_ReturnNull()
    {
        Comment comment = null;
        
        var expected = JsonSerializer.Serialize(comment);
        var actual = JsonSerializer.Serialize(_commentService.GetCommentById(5).Result);

        Assert.AreEqual(expected, actual);
    }

    [Test]
    public void GetCommentsByPostId_WithExistingPostId_ReturnCommentsInList()
    {
        int postId = 2;
        List<Comment> comments = new List<Comment>()
        {
            new Comment()
            {
                Id = 2,
                Message = "It seems quite bad. Maybe it is time to stay home.",
                Like = 0,
                DisLike = 0,
                User = null
            },
            new Comment()
            {
                Id = 3,
                Message =
                    "Well, visiting some caves is always a good idea even if it is reining inside the cave you will not recognize it.",
                Like = 0,
                DisLike = 0,
                User = null
            }
        };
        
        var expected = JsonSerializer.Serialize(comments);
        var actual = JsonSerializer.Serialize(_commentService.GetCommentsByPostId(postId).Result);
        
        Assert.AreEqual(expected, actual);
    }
    
    [Test]
    public void GetCommentsByPostId_WithNotExistingPostId_ReturnNull()
    {
        int postId = 7;
        List<Comment>? comments = null;

        var expected = JsonSerializer.Serialize(comments);
        var actual = JsonSerializer.Serialize(_commentService.GetCommentById(5).Result);

        Assert.AreEqual(expected, actual);
    }

    [Test]
    public async Task AddComment_ToExistingPost_WriteInDataBase()
    {
        int postId = 1;
        Comment comment = new Comment()
        {
            Id = 4,
            Message =
                "test",
            Like = 0,
            DisLike = 0,
            User = null
        };
        AppUser? user = new AppUser();
        Post post = new Post()
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
                    User = null
                }
            },
            Followers = new HashSet<AppUser>(),
            User = null
        };

        _postService.GetPostByPostId(postId).Returns(_forumContext.Posts.FirstOrDefault(x => x.Id == postId));
        await _commentService.AddComment(postId, comment, user, _postService);

        post.Comments.Add(comment);
        var expected = JsonSerializer.Serialize(post);
        var actual = JsonSerializer.Serialize(_forumContext.Posts.FirstOrDefault(x => x.Id == postId));

        Assert.AreEqual(expected, actual);
    }
}

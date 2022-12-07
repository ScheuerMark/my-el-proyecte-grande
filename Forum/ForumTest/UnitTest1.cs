using Forum.Data;
using Forum.Models;
using Forum.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Internal;

namespace ForumTest;

public class Tests : TestBase
{

    private CommentService _commentService;
    
    [SetUp]
    public new void Setup()
    {
        base.Setup();
        _commentService = new CommentService(_forumContext);
    }

    [Test]
    public void TestGetCommentByIdWithExistingId()
    {
        var expected = JsonSerializer.Serialize(new Comment()
        {
            Id = 1,
            Message = "It is better to go to the hospital",
            Like = 3,
            DisLike = 0,
            User = null
        });
        var actual = JsonSerializer.Serialize(_commentService.GetCommentById(1).Result);

        Assert.AreEqual(expected, actual);
    }
    
    [Test]
    public void TestGetCommentByIdWithNotExistingId()
    {
        Comment comment = null;
        var expected = JsonSerializer.Serialize(comment);
        var actual = JsonSerializer.Serialize(_commentService.GetCommentById(5).Result);

        Assert.AreEqual(expected, actual);
    }
}

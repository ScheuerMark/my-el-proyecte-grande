using Forum.Data;
using Forum.Models;
using Microsoft.EntityFrameworkCore;

namespace Forum.Services;

public class CommentService: Service
{
    public CommentService(ForumContext context) : base(context)
    {
    }
    
    virtual public async Task<List<Comment>> GetCommentsByPostId(int postId)
    {
        return _context.Posts.Include(x => x.Comments)
            .ThenInclude(y=>y.User)
            .Where(x => x.Id.Equals(postId))
            .FirstOrDefaultAsync().Result.Comments.ToList();
    }
    
    public async Task AddComment(int id, Comment comment, AppUser user, PostService postService)
    {
        comment.Like = 0;
        comment.DisLike = 0;
        try
        {
            _context.Add(user);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _context.Attach(user);
        } 

        comment.User = user;
        _context.Comments.Add(comment);

        Post? post = postService.GetPostByPostId(id).Result;
        post?.Comments.Add(comment);

        await _context.SaveChangesAsync();

    }

    public async Task LikeComment(int commentId)
    {
        GetCommentById(commentId).Result.Like++;

        await _context.SaveChangesAsync();
    }

    public async Task DisLikeComment(int commentId)
    {
        GetCommentById(commentId).Result.DisLike++;

        await _context.SaveChangesAsync();
    }

    public Task<Comment?> GetCommentById(int commentId)
    {
        return _context.Comments.Include(x=>x.User).Where(x=>x.Id.Equals(commentId)).FirstOrDefaultAsync();
    }

    public async Task UpdateComment(int id, Comment comment)
    {
        var commentToUpdate = await GetCommentById(id);
        commentToUpdate.Message = comment.Message;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCommentById(int id)
    {
        var commentToDelete = await GetCommentById(id);
        if (commentToDelete != null)
        {
            _context.Comments.Remove(commentToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
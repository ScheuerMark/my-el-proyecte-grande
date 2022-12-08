using Forum.Data;
using Forum.Models;
using Microsoft.EntityFrameworkCore;

namespace Forum.Services;

public class PostService: Service
{
    public PostService(ForumContext context) : base(context)
    {
    }
    
    public async Task<List<Post>> GetPostsByTopicTitle(string topicName)
    {
        return _context.Topics.Include(x => x.Posts)
            .ThenInclude(x=>x.Comments)
            .Include(x=>x.Posts).ThenInclude(x=>x.User)
            .Where(x => x.Title.Equals(topicName))
            .FirstOrDefaultAsync().Result?.Posts.ToList();
    }
    
    public Task<List<Post>> GetAllPostAscByDate()
    {
        return _context.Posts.Include(x=>x.Comments)
            .OrderBy(x=>x.DateTime).ToListAsync();
    }
    
    public Task<Post?> GetPostByPostId(int id)
    {
        return _context.Posts.Include(x=>x.User).Include(x=>x.Comments).ThenInclude(y=>y.User)
            .Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
    }
    
    public async Task AddPost(string topicName, Post post, TopicService topicService)
    {

        try
        {
            _context.Add(post.User);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _context.Attach(post.User);
        }


        _context.Posts.Add(post);
        
        topicService.GetTopicByTitle(topicName).Result.Posts.Add(post);

        await _context.SaveChangesAsync();

    }
    
    public Task<List<Post>> GetPostsBySearchPhrase(string searchPhrase)
    {
        searchPhrase = searchPhrase.Trim();
        return _context.Posts.Include(x => x.Comments)
            .Where(post => post.Message.Contains(searchPhrase)
                           || post.Comments.Any(comment => comment.Message.Contains(searchPhrase)))
            .Select(x => new Post(){
                Id = x.Id,
                DateTime = x.DateTime,
                Title = x.Title,
                Message = x.Message,
                Comments = x.Comments.Where(comment => comment.Message.Contains(searchPhrase)).ToHashSet(),
                Followers = x.Followers,
                Solution = x.Solution,
                User = x.User
            })
            .ToListAsync();
    }

    public async Task UpdatePost(int id, Post post)
    {
        var postToUpdate = await GetPostByPostId(id);
        postToUpdate.Title = post.Title;
        postToUpdate.Message = post.Message;
        await _context.SaveChangesAsync();
    }
    
    public async Task<List<Post>> GetPostsByTopicId(int topicId)
    {
        return _context.Topics.Include(x => x.Posts)
            .ThenInclude(x=>x.Comments)
            .Where(x => x.Id.Equals(topicId))
            .FirstOrDefaultAsync().Result?.Posts.ToList();
    }
    
    public async Task DeletePostById(int id, CommentService commentService)
    {
        var postToDelete = await GetPostByPostId(id);
        if (postToDelete != null)
        {
            var commentsToDelete = await commentService.GetCommentsByPostId(id);
            foreach (var comment in commentsToDelete)
            {
                _context.Comments.Remove(comment);
            }

            _context.Posts.Remove(postToDelete);
            await _context.SaveChangesAsync();
        }
    }


}
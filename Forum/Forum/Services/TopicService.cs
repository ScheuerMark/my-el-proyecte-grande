using Forum.Data;
using Forum.Models;
using Microsoft.EntityFrameworkCore;

namespace Forum.Services;

public class TopicService: Service
{
    public TopicService(ForumContext context) : base(context)
    {
    }


    public Task<List<Topic>> GetAllTopics()
    {
        return _context.Topics.Include(x=>x.Posts).ToListAsync();
    }
    
    public Task<List<string>> GetAllTopicsTitles()
    {
        return _context.Topics.Select(x => x.Title).ToListAsync();
    }
    
    virtual public Task<Topic?> GetTopicByTitle(string title)
    {
        return _context.Topics.Where(x => x.Title.Equals(title)).FirstOrDefaultAsync();
    }
    
    public async Task UpdateTopic(int id, Topic topic)
    {
        var topicToUpdate = await _context.Topics.Where(t => t.Id.Equals(id)).FirstOrDefaultAsync();
        topicToUpdate.Title = topic.Title;
        topicToUpdate.Description = topic.Description;
        await _context.SaveChangesAsync();
    }
    
    public Task<Topic?> GetTopicById(int topicId)
    {
        return _context.Topics.Where(x=>x.Id.Equals(topicId)).FirstOrDefaultAsync();
    }
        
    public async Task<List<Post>> GetPostsByTopicId(int topicId)
    {
        return _context.Topics.Include(x => x.Posts)
            .ThenInclude(x=>x.Comments)
            .Where(x => x.Id.Equals(topicId))
            .FirstOrDefaultAsync().Result.Posts.ToList();
    }
    public async Task DeleteTopicById(int topicId, PostService postService, CommentService commentService)
    {
        var posts = await postService.GetPostsByTopicId(topicId);
        foreach (var post in posts)
        {
            await postService.DeletePostById(post.Id, commentService);
        }

        var topicsToDelete = await GetTopicById(topicId);
        _context.Topics.Remove(topicsToDelete);
        await _context.SaveChangesAsync();
    }
}
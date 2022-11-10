using Forum.Data;
using Forum.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Forum.Services
{
    public class SqlService
    {
        private ForumContext _context;
        public SqlService(ForumContext context)
        {
            _context = context;
        }


        public async Task<List<Post>> GetPostsByTopicTitle(string topicName)
        {
            return _context.Topics.Include(x => x.Posts)
                .ThenInclude(x=>x.Comments)
                .Where(x => x.Title.Equals(topicName))
                .FirstOrDefaultAsync().Result.Posts.ToList();
        }

        public Task<List<Topic>> GetAllTopics()
        {
            return _context.Topics.Include(x=>x.Posts).ToListAsync();
        }

        public Task<List<string>> GetAllTopicsTitles()
        {
            return _context.Topics.Select(x => x.Title).ToListAsync();
        }

        public Task<List<Post>> GetAllPostAscByDate()
        {
            return _context.Posts.Include(x=>x.Comments)
                .OrderBy(x=>x.DateTime).ToListAsync();
        }

        public async Task<List<Comment>> GetCommentsByPostId(int postId)
        {
            return _context.Posts.Include(x => x.Comments)
                .Where(x => x.Id.Equals(postId))
                .FirstOrDefaultAsync().Result.Comments.ToList();
        }

        public Task<Post?> GetPostByPostId(int id)
        {
            return _context.Posts.Include(x=>x.Comments)
                .Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task AddPost(string topicName, Post post)
        {
            _context.Posts.Add(post);

            GetTopicByTitle(topicName).Result.Posts.Add(post);

            await _context.SaveChangesAsync();

        }

        public Task<Topic?> GetTopicByTitle(string title)
        {
            return _context.Topics.Where(x => x.Title.Equals(title)).FirstOrDefaultAsync();
        }


        public async Task AddComment(int id, Comment comment)
        {
            comment.Like = 0;
            comment.DisLike = 0;

            _context.Comments.Add(comment);

            GetPostByPostId(id).Result.Comments.Add(comment);

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
            return _context.Comments.Where(x=>x.Id.Equals(commentId)).FirstOrDefaultAsync();
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
                })
                .ToListAsync();
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
}

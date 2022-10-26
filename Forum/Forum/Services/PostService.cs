using Forum.Daos.Implementations;
using Forum.Models;

namespace Forum.Services;

public class PostService
{
    private readonly PostDaoMemory postDao;
    private readonly TopicDaoMemory topicDao;

    public PostService(PostDaoMemory postDao, TopicDaoMemory topicDao)
    {
        this.postDao = postDao;
        this.topicDao = topicDao;
    }

    public IEnumerable<Post> GetAllPosts()
    {
        return postDao.GetAll();
    }

    public IEnumerable<Post> GetAllPostAscByDate()
    {
        return GetAllPosts().OrderBy(x => x.DateTime);
    }
    
    public IEnumerable<Post> GetAllPostDescByDate()
    {
        return GetAllPosts().OrderByDescending(x => x.DateTime);
    }

    public IEnumerable<Topic> GetAllTopics()
    {
        return topicDao.GetAll();
    }
    
    public IEnumerable<string> GetAllTopicsTitles()
    {
        return GetAllTopics().Select(x => x.Title);
    }

    public Post GetPostWithMostComments()
    {
        var posts = postDao.GetAll();
        return posts.OrderByDescending(x => x.NumberOfComments).First();
    }
    
    public Post GetPostWithLeastComments()
    {
        var posts = postDao.GetAll();
        return posts.OrderBy(x => x.NumberOfComments).First();
    }
    
    public IEnumerable<Post> GetPostsByTopicTitle(string title)
    {
        var topics = topicDao.GetAll();
        return topics.Where(x => x.Title == title).SelectMany(x => x.Posts);
    }
    
    public Post GetPostByPostTitle(string title)
    {
        var posts = postDao.GetAll();
        return posts.Where(x => x.Title == title).FirstOrDefault();
    }
    
    public Post GetPostByPostId(int id)
    {
        return postDao.GetAll().Where(x => x.Id == id).FirstOrDefault();
    }
    
    public IEnumerable<Comment> GetCommentsByPostTitle(string title)
    {
        return GetPostByPostTitle(title).Comments;
    }
    
    public IEnumerable<Comment> GetCommentsByPostId(int id)
    {
        return GetPostByPostId(id).Comments;
    }

    public void AddPost(string title, Post post)
    {
        var posts = postDao.GetAll().ToList();
        post.Id = posts.Count;
        var topicToAdd = topicDao.GetTopic(title);
        topicToAdd.Posts.Add(post);
        postDao.Add(post);   
    }

    public void AddComment(int id, Comment comment)
    {
        var post = GetPostByPostId(id);
        comment.Id = post.Comments.Count;
        post.Comments.Add(comment);
    }
}
using Forum.Data;

namespace Forum.Services;

public abstract class Service
{
    protected ForumContext _context;

    protected Service(ForumContext context)
    {
        _context = context;
    }
}
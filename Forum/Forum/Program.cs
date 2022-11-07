using Forum.Daos;
using Forum.Daos.Implementations;
using Forum.Data;
using Forum.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ForumContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

SetupInMemoryDatabases();

CreateDbIfNotExists(app);

app.Run();


void CreateDbIfNotExists(IHost host)
{
    using (var scope = host.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<ForumContext>();
            DbInitializer.Initialize(context);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred creating the DB.");
        }
    }
}

void SetupInMemoryDatabases()
{
    IPostDao postStore = PostDaoMemory.GetInstance();
    ITopicDao topicStore = TopicDaoMemory.GetInstance();

    Topic accident = new Topic()
    {
        Title = "Accident",
        Description = "This topic is thought to share your thought regarding accidents happened with the child. Share your experiences and doubts.",
        Posts = new HashSet<Post>()
    };
    topicStore.Add(accident);
    Post battery = new Post()
    {
        Id = 1,
        Title = "Battery in throat",
        Message = "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
        Comments = new HashSet<Comment>(),
        Followers = new HashSet<User>()
    };
    postStore.Add(battery);
    accident.Posts.Add(battery);
    Comment battery1 = new Comment()
    {
        Id = 0,
        Message = "It is better to go to the hospital",
        Like = 3,
        DisLike = 0
    };
    battery.Comments.Add(battery1);

    Topic wandering = new Topic()
    {
        Title = "Wandering",
        Description = "Let's talk about a bit how to spend the time in the nature with your family.",
        Posts = new HashSet<Post>()
    };
    topicStore.Add(wandering);
    Post rainy = new Post()
    {
        Id = 2,
        Title = "Rainy weather",
        Message = "This weekend is it is going to be cloudy with plenty of rains. Any idea what to do? Where to go?",
        Comments = new HashSet<Comment>(),
        Followers = new HashSet<User>()
    };
    postStore.Add(rainy);
    wandering.Posts.Add(rainy);
    Comment stayHome = new Comment()
    {
        Id = 1,
        Message = "It seems quite bad. Maybe it is time to stay home.",
        Like = 0,
        DisLike = 0
    };
    Comment visitCaves = new Comment()
    {
        Id = 2,
        Message = "Well, visiting some caves is always a good idea even if it is reining inside the cave you will not recognize it.",
        Like = 0,
        DisLike = 0
    };
    rainy.Comments.Add(stayHome);
    rainy.Comments.Add(visitCaves);

    Topic playAround = new Topic()
    {
        Title = "Play around",
        Description = "This topic is about toys, games and everything which makes for the kids fun.",
        Posts = new HashSet<Post>()
    };
    topicStore.Add(playAround);

    Topic eatingHabits = new Topic()
    {
        Title = "Eating habits",
        Description = "Everything about meal and eating habits",
        Posts = new HashSet<Post>()
    };
    topicStore.Add(eatingHabits);
}
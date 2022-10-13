using Forum.Daos;
using Forum.Daos.Implementations;
using Forum.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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

app.Run();


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
        Title = "Battery in through",
        Message = "My son took a AAA battery into his mouth and now it got stuck in his through. What can I do?",
        Comments = new HashSet<Comment>(),
        Followers = new HashSet<User>()
    };
    postStore.Add(battery);
    accident.Posts.Add(battery);
    Comment battery1 = new Comment()
    {
        Message = "It is better to go to the hospital"
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
        Title = "Rainy weather",
        Message = "This weekend is it is going to be cloudy with plenty of rains. Any idea what to do? Where to go?",
        Comments = new HashSet<Comment>(),
        Followers = new HashSet<User>()
    };
    postStore.Add(rainy);
    wandering.Posts.Add(rainy);
    Comment stayHome = new Comment()
    {
        Message = "It seems quite bad. Maybe it is time to stay home."
    };
    Comment visitCaves = new Comment()
    {
        Message = "Well, visiting some caves is always a good idea even if it is reining inside the cave you will not recognize it."
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
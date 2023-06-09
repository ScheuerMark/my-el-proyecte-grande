﻿using Forum.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;

namespace Forum.Data
{
    public class DbInitializer
    {
        public static void Initialize(ForumContext context, AppIdentityDbContext identityDbContext, UserManager<AppUser> userMgr, RoleManager<IdentityRole> roleMgr)
        {

            context.Database.EnsureCreated();
            identityDbContext.Database.EnsureCreated();

            if (context.Posts.Any() || context.Topics.Any() || context.Comments.Any() || identityDbContext.Users.Any())
            {
                return;
            }

            AppUser admin = new AppUser
            {
                UserName = "Admin",
                Email = "Admin@admin.com"
            };

            IdentityResult result = userMgr.CreateAsync(admin, "Admin123!").Result;

            IdentityResult result2 = roleMgr.CreateAsync(new IdentityRole("Admin")).Result;
            IdentityResult result4 = roleMgr.CreateAsync(new IdentityRole("User")).Result;

            IdentityResult result3 = userMgr.AddToRoleAsync(admin, "Admin").Result;

            List<Topic> topics = new List<Topic>()
            {
                new Topic()
                {
                    Title = "Accident",
                    Description =
                        "This topic is thought to share your thought regarding accidents happened with the child. Share your experiences and doubts.",
                    Posts = new HashSet<Post>(),
                    User = admin
                },
                new Topic()
                {
                    Title = "Wandering",
                    Description = "Let's talk about a bit how to spend the time in the nature with your family.",
                    Posts = new HashSet<Post>(),
                    User = admin
                },
                new Topic()
                {
                    Title = "Play around",
                    Description = "This topic is about toys, games and everything which makes for the kids fun.",
                    Posts = new HashSet<Post>(),
                    User = admin
                },
                new Topic()
                {
                    Title = "Eating habits",
                    Description = "Everything about meal and eating habits",
                    Posts = new HashSet<Post>(),
                    User = admin
                }
            };

            List<Post> posts = new List<Post>()
            {
                new Post()
                {
                    Title = "Battery in throat",
                    Message =
                        "My son took a AAA battery into his mouth and now it got stuck in his throat. What can I do?",
                    Comments = new HashSet<Comment>(),
                    Followers = new HashSet<AppUser>(),
                    User = admin
                },
                new Post()
                {
                    Title = "Rainy weather",
                    Message =
                        "This weekend is it is going to be cloudy with plenty of rains. Any idea what to do? Where to go?",
                    Comments = new HashSet<Comment>(),
                    Followers = new HashSet<AppUser>(),
                    User = admin
                }
            };

            List<Comment> comments = new List<Comment>()
            {
                new Comment()
                {
                    Message = "It is better to go to the hospital",
                    Like = 3,
                    DisLike = 0,
                    User = admin
                },
                new Comment()
                {
                    Message = "It seems quite bad. Maybe it is time to stay home.",
                    Like = 0,
                    DisLike = 0,
                    User = admin
                },
                new Comment()
                {
                    Message =
                        "Well, visiting some caves is always a good idea even if it is reining inside the cave you will not recognize it.",
                    Like = 0,
                    DisLike = 0,
                    User = admin
                },
            };

            posts[0].Comments.Add(comments[0]);
            posts[1].Comments.Add(comments[1]);
            posts[1].Comments.Add(comments[2]);

            topics[0].Posts.Add(posts[0]);
            topics[1].Posts.Add(posts[1]);

            foreach (var comment in comments)
            {
                context.Comments.Add(comment);
            }


            foreach (var post in posts)
            {
                context.Posts.Add(post);
            }


            foreach (var topic in topics)
            {
                context.Topics.Add(topic);
            }

            context.SaveChanges();
            identityDbContext.SaveChanges();
        }
    }
}

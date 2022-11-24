using Forum.Data;
using Forum.Models;
using Forum.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ForumContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]));
builder.Services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<AppIdentityDbContext>().AddDefaultTokenProviders();
builder.Services.ConfigureApplicationCookie(opts =>
{
    opts.LoginPath = new PathString("/Account/Login");
    opts.LogoutPath = new PathString("/Account/Logout");

    opts.Events.OnRedirectToAccessDenied = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api")
            && context.Response.StatusCode == StatusCodes.Status200OK)
        {
            context.Response.Clear();
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
    opts.Events.OnRedirectToLogin = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api")
            && context.Response.StatusCode == StatusCodes.Status200OK)
        {
            context.Response.Clear();
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<SqlService>();

builder.Services.AddCors(o => o.AddPolicy("AllowAnyOrigin",
    builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    }));

builder.Services.Configure<IdentityOptions>(opts =>
    {
        opts.User.AllowedUserNameCharacters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -._@+";
    }
);

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

app.UseCors("AllowAnyOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


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
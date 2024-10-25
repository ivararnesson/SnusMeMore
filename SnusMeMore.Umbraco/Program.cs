
using Umbraco.Cms.Core.Web;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Umbraco.Cms.Core.Services;
using System.Security.Claims;
using SnusMeMore;
using Microsoft.AspNetCore.Mvc;
using System;
using static Umbraco.Cms.Core.Constants.DataTypes;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication("CustomAuth")
    .AddCookie("CustomAuth", options =>
    {
        options.LoginPath = "/api/login";
        options.LogoutPath = "/api/logout";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
    });

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

WebApplication app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

await app.BootUmbracoAsync();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/content/navbar/{guid:guid}", (Guid guid, IUmbracoContextAccessor umbracoContextAccessor) =>
{
    var umbracoContext = umbracoContextAccessor.GetRequiredUmbracoContext();
    var content = umbracoContext.Content.GetById(guid);

    if (content == null)
    {
        return Results.NotFound();
    }

    var result = new
    {
        Title = content.Value<string>("title"),
        Home = content.Value<string>("home"),
        OptionOne = content.Value<string>("optionOne"),
        OptionTwo = content.Value<string>("optionTwo"),
        OptionThree = content.Value<string>("optionThree"),
        ShoppingCart = content.Value<string>("shoppingCart"),
    };

    return Results.Ok(result);
});

app.MapGet("/api/content/snusitems/{guid:guid}", (Guid guid, IUmbracoContextAccessor umbracoContextAccessor) =>
{
    var umbracoContext = umbracoContextAccessor.GetRequiredUmbracoContext();
    var content = umbracoContext.Content.GetById(guid);

    if (content == null)
    {
        return Results.NotFound();
    }

    var selection = content
            .ChildrenOfType("SnusItem")
            .Where(x => x.IsVisible())
            .OrderByDescending(x => x.CreateDate);

    var result = selection.Select(x => new
    {
        SnusName = x.Value<string>("snusName"),
        Description = x.Value<string>("description"),
        Price = x.Value<string>("price"),
        ImageUrl = x.Value<string>("imageUrl")
    }).ToList();

    return Results.Ok(result);
});

app.MapPost("/api/login", async ([FromBody] LoginRequest loginRequest, IMemberService memberService, IHttpContextAccessor httpContextAccessor) =>
{
    if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.Password))
    {
        return Results.BadRequest(new { Message = "Invalid login request" });
    }

    var member = memberService.GetByEmail(loginRequest.Email);

    if (member != null/* && loginRequest.Password == "turegillarintegrupp6"*/) //cant find way to verify the password correctly
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, member.Key.ToString()),
            new Claim(ClaimTypes.Name, member.Username)
        };

        var claimsIdentity = new ClaimsIdentity(claims, "CustomAuth");

        await httpContextAccessor.HttpContext.SignInAsync("CustomAuth", new ClaimsPrincipal(claimsIdentity));

        return Results.Ok(new { Message = "Login successful", UserId = member.Key });
    }

    return Results.Unauthorized();
});

app.MapPost("/api/logout", async (IHttpContextAccessor httpContextAccessor) =>
{
    var httpContext = httpContextAccessor.HttpContext;

    if (httpContext.User.Identity.IsAuthenticated)
    {
        await httpContext.SignOutAsync();

        return Results.Ok(new { Message = "Logout successful" });
    }

    return Results.Unauthorized();
});

app.MapGet("/api/check-login", (HttpContext httpContext) =>
{
    return Results.Ok(new { IsAuthenticated = httpContext.User.Identity?.IsAuthenticated ?? false });
});

app.MapGet("/api/cart/{userId}", async (HttpContext context, string userId, IUmbracoContextAccessor umbracoContextAccessor) =>
{
    var umbracoContext = umbracoContextAccessor.GetRequiredUmbracoContext();
    var cartItemsContent = umbracoContext.Content.GetById(new Guid("19e70cf7-6cad-452c-83d6-bf41552b298c"));
    var snusItemsContent = umbracoContext.Content.GetById(new Guid("b6fa2545-2966-42ee-adae-a72e7eb941cf"));

    if (cartItemsContent == null || snusItemsContent == null)
    {
        return Results.NotFound();
    }

    var cartItems = cartItemsContent
            .ChildrenOfType("CartItem")
            .Where(x => x.IsVisible())
            .OrderByDescending(x => x.CreateDate)
            .ToList();

    var itemIds = cartItems.Select(x => x.Value<string>("snusId")).ToList();

    var snusItems = snusItemsContent
        .ChildrenOfType("SnusItem")
        .Where(x => x.IsVisible())
        .OrderByDescending(x => x.CreateDate)
        .ToList();

    var result = snusItems
    .Where(x => itemIds.Contains($"{x.Id}")) //this does not work
    .Select(x => new
    {
        SnusName = x.Value<string>("snusName"),
        Description = x.Value<string>("description"),
        Price = x.Value<string>("price"),
        ImageUrl = x.Value<string>("imageUrl")
    }).ToList();

    return Results.Ok(result);
});

app.MapPost("/api/cart/add", async (HttpContext context, CartAddRequest newItem, IMemberService memberService, IContentService contentService) =>
{
    var userId = context.Items["UserId"] as string;
    if (string.IsNullOrEmpty(userId))
    {
        return Results.Unauthorized();
    }

    var cartItem = contentService.Create("CartItem", -1, "cartItem");
    cartItem.SetValue("userId", userId);
    cartItem.SetValue("itemId", newItem.ItemId);

    contentService.SaveAndPublish(cartItem);

    return Results.Ok("Item added to cart.");
});

await app.RunAsync();
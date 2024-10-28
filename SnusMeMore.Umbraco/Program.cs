
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Core.Services;
using SnusMeMore;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Media.EmbedProviders;
using Microsoft.IdentityModel.Tokens;
using Polly;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

string GetAuthHeader(HttpContext context)
{
    return context.Request.Headers.Authorization.ToString().Replace("Token ", "").Trim();
}

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
        Category = x.Value<string>("category"),
        Description = x.Value<string>("description"),
        Price = x.Value<string>("price"),
        ImageUrl = x.Value<string>("imageUrl"),
        SnusId = x.Key,
        Brand = x.Value<string>("brand"),
    }).ToList();

    return Results.Ok(result);
});

List<string> LoggedInUsers = new List<string>();

app.MapPost("/api/login", ([FromBody] LoginRequest loginRequest, IMemberService memberService) =>
{
    if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.Password))
    {
        return Results.BadRequest(new { Message = "Invalid login request" });
    }

    var member = memberService.GetByEmail(loginRequest.Email);

    if (member != null && loginRequest.Password == "turegillarintegrupp6") // is hard coded
    {
        if (!LoggedInUsers.Contains(member.Key.ToString()))
        {
            LoggedInUsers.Add(member.Key.ToString());
        }

        return Results.Ok(new { Message = "Login successful", UserId = member.Key });
    }

    return Results.Unauthorized();
});

app.MapPost("/api/logout", (HttpContext context, IMemberService memberService) =>
{
    string? userId = GetAuthHeader(context);

    if (!userId.IsNullOrWhiteSpace())
    {
        var member = memberService.GetByKey(new Guid(userId));

        if (member == null) return Results.BadRequest(new { Message = "Invalid userId" });

        bool result = LoggedInUsers.Remove(member.Key.ToString());

        if (result) return Results.Ok(new { Message = "Logout successful" });
    }

    return Results.Unauthorized();
});

app.MapGet("/api/check-login", (HttpContext httpContext) =>
{
    return Results.Ok(new { IsAuthenticated = httpContext.User.Identity?.IsAuthenticated ?? false }); //this is old
});

app.MapGet("/api/cart", (HttpContext context, IUmbracoContextAccessor umbracoContextAccessor) =>
{
    string? userId = GetAuthHeader(context);

    var umbracoContext = umbracoContextAccessor.GetRequiredUmbracoContext();
    var cartItemsContent = umbracoContext.Content.GetById(new Guid("19e70cf7-6cad-452c-83d6-bf41552b298c"));
    var snusItemsContent = umbracoContext.Content.GetById(new Guid("b6fa2545-2966-42ee-adae-a72e7eb941cf"));

    if (cartItemsContent == null || snusItemsContent == null || userId.IsNullOrEmpty())
    {
        return Results.NotFound();
    }

    var cartItems = cartItemsContent
        .ChildrenOfType("CartItem")
        .Where(x => x.Value<string>("userId") == userId)
        .ToList();

    var cartItemsSnusIds = cartItems.Select(x => x.Value<string>("snusId")).ToList();

    var snusItems = snusItemsContent
        .ChildrenOfType("SnusItem")
        .OrderByDescending(x => x.CreateDate)
        .Where(x => cartItemsSnusIds.Contains(x.Key.ToString()))
        .ToList();

    var result = snusItems
        .Select(x => new
        {
            SnusName = x.Value<string>("snusName"),
            Description = x.Value<string>("description"),
            Price = x.Value<string>("price"),
            ImageUrl = x.Value<string>("imageUrl"),
            SnusId = x.Key
        })
        .ToList();

    return Results.Ok(result);
});

app.MapPost("/api/cart/add", (HttpContext context, [FromBody] CartAddRequest newItem, IMemberService memberService, IContentService contentService) =>
{
    var userId = GetAuthHeader(context);

    if (string.IsNullOrEmpty(userId))
    {
        return Results.Unauthorized();
    }

    var cartItem = contentService.Create("CartItem", -1, "cartItem");
    cartItem.SetValue("userId", userId);
    cartItem.SetValue("snusId", newItem.ItemId);

    contentService.Save(cartItem);
    contentService.Publish(cartItem, []);

    var publishedContent = contentService.GetById(cartItem.Id);
    if (publishedContent != null && publishedContent.Published)
    {
        return Results.Ok($"Snus with id [{newItem.ItemId}] added to cart.");
    }
    else
    {
        return Results.StatusCode(500);
    }
});

await app.RunAsync();
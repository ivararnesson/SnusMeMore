using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;

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

app.MapGet("api/content/{guid:guid}", (Guid guid, IUmbracoContextAccessor umbracoContextAccessor) =>
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

await app.RunAsync();

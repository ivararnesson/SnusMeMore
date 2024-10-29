
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Core.Services;
using SnusMeMore;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Media.EmbedProviders;
using Microsoft.IdentityModel.Tokens;
using Polly;
using SnusMeMore.Services;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.Common.Security;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ISnusService, SnusService>();
builder.Services.AddSingleton<ICartService, CartService>();

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

Endpoints.MapEndpoints(app);

await app.RunAsync();
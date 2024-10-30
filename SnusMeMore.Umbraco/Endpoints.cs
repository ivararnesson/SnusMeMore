using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using SnusMeMore.Services;

namespace SnusMeMore
{
    public static class Endpoints
    {
        public static void MapEndpoints(WebApplication app)
        {
            MapSnusEndpoints(app);
            MapCartEndpoints(app);
        }

        private static void MapSnusEndpoints(WebApplication app)
        {
            app.MapGet("/api/content/navbar", (ISnusService service) => service.GetNavbar());
            app.MapGet("/api/content/snusitems", (ISnusService service) => service.GetAllSnus());
            app.MapPost("/api/content/snusitem/{guid:guid}/rating", (ISnusService service, HttpContext context, Guid guid, [FromBody] AddRating ratingDto) =>
                service.AddRating(context, guid, ratingDto));
            app.MapGet("/api/content/snusitem/{guid:guid}/average-rating", (ISnusService service, Guid guid) =>
            {
                return service.GetAverageRating(guid);
            });
        }

        private static void MapCartEndpoints(WebApplication app)
        {
            app.MapPost("/api/signup", (ICartService service, [FromBody] SignupRequest signupRequest) => service.Signup(signupRequest));
            app.MapPost("/api/login", (ICartService service, [FromBody] LoginRequest loginRequest) => service.Login(loginRequest));
            app.MapPost("/api/logout", (ICartService service, HttpContext httpContext) => service.Logout(httpContext));
            app.MapGet("/api/check-login", (ICartService service, HttpContext httpContext) => service.CheckLogin(httpContext));
            app.MapGet("/api/cart", (ICartService service, HttpContext httpContext) => service.GetCart(httpContext));
            app.MapPost("/api/cart", (ICartService service, HttpContext httpContext, [FromBody] CartRequest newItem) => service.AddToCart(httpContext, newItem));
            app.MapDelete("/api/cart", (ICartService service, HttpContext httpContext, [FromBody] CartRequest item) => service.RemoveFromCart(httpContext, item));
        }
    }
}

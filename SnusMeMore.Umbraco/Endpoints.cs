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
            MapLoginEndpoints(app);

        }

        private static void MapSnusEndpoints(WebApplication app)
        {
            app.MapGet("/api/content/navbar", (ISnusService service) => service.GetNavbar());
            app.MapGet("api/content/footer", (ISnusService service) => service.GetFooter());
            app.MapGet("/api/content/snusitems", (ISnusService service) => service.GetAllSnus());
            app.MapPost("/api/content/snusitem/{guid:guid}/rating", (ISnusService service, HttpContext context, Guid guid, [FromBody] AddRating ratingDto) =>
                service.AddRating(context, guid, ratingDto));
            app.MapGet("/api/content/snusitem/{guid:guid}/average-rating", (ISnusService service, Guid guid) => service.GetAverageRating(guid));
            app.MapGet("/api/search", (ISnusService service, string query) => service.SearchSnus(query));
            app.MapGet("/api/content/snusitem", (ISnusService snusService, string snusName) =>
                snusService.GetSnusByName(snusName));
            app.MapGet("/api/content/top-rated-snus", (ISnusService service) => service.GetTopRatedSnus());
        }

        private static void MapCartEndpoints(WebApplication app)
        {
            app.MapGet("/api/cart", (ICartService service, HttpContext httpContext) => service.GetCart(httpContext));
            app.MapPost("/api/cart", (ICartService service, HttpContext httpContext, [FromBody] CartRequest newItem) => service.AddToCart(httpContext, newItem));
            app.MapDelete("/api/cart", (ICartService service, HttpContext httpContext, [FromBody] CartRequest item) => service.RemoveFromCart(httpContext, item));
        }
        private static void MapLoginEndpoints(WebApplication app)
        {
            app.MapPost("/api/signup", (ILoginService service, [FromBody] SignupRequest signupRequest) => service.Signup(signupRequest));
            app.MapPost("/api/login", (ILoginService service, [FromBody] LoginRequest loginRequest) => service.Login(loginRequest));
            app.MapPost("/api/logout", (ILoginService service, HttpContext httpContext) => service.Logout(httpContext));
            app.MapGet("/api/check-login", (ILoginService service, HttpContext httpContext) => service.CheckLogin(httpContext));
        }

    }
}

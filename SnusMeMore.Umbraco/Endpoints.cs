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
        }

        private static void MapCartEndpoints(WebApplication app)
        {
            app.MapPost("/api/login", (ICartService service, [FromBody] LoginRequest loginRequest) => service.Login(loginRequest));
            app.MapPost("/api/logout", (ICartService service, HttpContext httpContext) => service.Logout(httpContext));
            app.MapGet("/api/check-login", (ICartService service, HttpContext httpContext) => service.CheckLogin(httpContext));
            app.MapGet("/api/cart", (ICartService service, HttpContext httpContext) => service.GetCart(httpContext));
            app.MapPost("/api/cart/add", (ICartService service, HttpContext httpContext, [FromBody] CartAddRequest newItem) => service.AddToCart(httpContext, newItem));
        }
    }
}

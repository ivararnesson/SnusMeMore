
namespace SnusMeMore.Services
{
    public interface ICartService
    {
        IResult AddToCart(HttpContext context, CartAddRequest newItem);
        IResult CheckLogin(HttpContext httpContext);
        IResult GetCart(HttpContext context);
        IResult Login(LoginRequest loginRequest);
        IResult Logout(HttpContext context);
    }
}
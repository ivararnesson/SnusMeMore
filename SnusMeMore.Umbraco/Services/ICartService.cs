
namespace SnusMeMore.Services
{
    public interface ICartService
    {
        IResult AddToCart(HttpContext context, CartRequest newItem);
        IResult CheckLogin(HttpContext httpContext);
        IResult GetCart(HttpContext context);
        IResult Login(LoginRequest loginRequest);
        IResult Logout(HttpContext context);
        IResult RemoveFromCart(HttpContext httpContext, CartRequest item);
        IResult Signup(SignupRequest signupRequest);
    }
}
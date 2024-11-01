
namespace SnusMeMore.Services
{
    public interface ILoginService
    {
        IResult CheckLogin(HttpContext context);
        IResult Login(LoginRequest loginRequest);
        IResult Logout(HttpContext context);
        IResult Signup(SignupRequest signupRequest);
    }
}
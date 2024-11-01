using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;

namespace SnusMeMore.Services
{
    public class LoginService : ILoginService
    {
        private readonly IMemberService MemberService;

        public static readonly List<string> LoggedInUsers = new List<string>();

        public LoginService(IMemberService memberService)
        {
            MemberService = memberService;
        }

        public IResult Signup(SignupRequest signupRequest)
        {
            if (MemberService.GetByEmail(signupRequest.Email) != null)
            {
                return Results.Conflict("A member with this email already exists.");
            }

            var newMember = MemberService.CreateMember(signupRequest.Username, signupRequest.Email, signupRequest.Username, "Member");
            newMember.SetValue("password", signupRequest.Password);

            MemberService.Save(newMember);

            return Results.Ok("Member created successfully.");
        }

        public IResult Login(LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.Password))
            {
                return Results.BadRequest(new { Message = "Invalid login request" });
            }
            var member = MemberService.GetByEmail(loginRequest.Email);

            if (member != null && loginRequest.Password == member.GetValue<string>("password"))
            {
                if (!LoggedInUsers.Contains(member.Key.ToString()))
                {
                    LoggedInUsers.Add(member.Key.ToString());
                }

                return Results.Ok(new { Message = "Login successful", UserId = member.Key, Email = loginRequest.Email });
            }

            return Results.Unauthorized();
        }


        public IResult Logout(HttpContext context)
        {
            string? userId = Common.GetAuthHeader(context);

            if (!userId.IsNullOrWhiteSpace())
            {
                var member = MemberService.GetByKey(new Guid(userId));

                if (member == null) return Results.BadRequest(new { Message = "Invalid userId" });

                bool result = LoggedInUsers.Remove(member.Key.ToString());

                if (result) return Results.Ok(new { Message = "Logout successful" });
            }

            return Results.Unauthorized();
        }


        public IResult CheckLogin(HttpContext context)
        {
            string? userId = Common.GetAuthHeader(context);

            if (!userId.IsNullOrWhiteSpace() && LoggedInUsers.Contains(userId))
            {
                return Results.Ok();
            }

            return Results.Unauthorized();
        }
    }
}

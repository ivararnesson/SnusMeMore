using Microsoft.IdentityModel.Tokens;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;

namespace SnusMeMore.Services
{
    public class CartService : ICartService
    {
        private readonly IMemberService MemberService;
        private readonly IUmbracoContextAccessor UmbracoContextAccessor;
        private readonly IContentService ContentService;

        public static readonly List<string> LoggedInUsers = new List<string>();

        public CartService(IMemberService memberService, IUmbracoContextAccessor umbracoContextAccessor, IContentService contentService)
        {
            MemberService = memberService;
            UmbracoContextAccessor = umbracoContextAccessor;
            ContentService = contentService;
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


        public IResult GetCart(HttpContext context)
        {
            string? userId = Common.GetAuthHeader(context);

            var umbracoContext = UmbracoContextAccessor.GetRequiredUmbracoContext();

            var cartRef = ContentService.GetRootContent().FirstOrDefault(x => x.Name == "CartItemList");
            var snusRef = ContentService.GetRootContent().FirstOrDefault(x => x.Name == "SnusList");
            var cartItemsContent = umbracoContext.Content.GetById(cartRef.Key);
            var snusItemsContent = umbracoContext.Content.GetById(snusRef.Key);

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

            var quantetyMap = new Dictionary<string, int>();

            foreach (var item in snusItems)
            {
                var snusId = item.Key.ToString();
                int quantity = cartItems.FirstOrDefault(item => item.Value<string>("snusId") == snusId).Value<int>("quantity");

                quantetyMap.Add(snusId, quantity);
            }

            var result = Common.GetCartSnusDTO(snusItems, quantetyMap);

            return Results.Ok(result);
        }


        public IResult AddToCart(HttpContext context, CartRequest newItem)
        {
            var userId = Common.GetAuthHeader(context);

            if (string.IsNullOrEmpty(userId))
            {
                return Results.Unauthorized();
            }

            var cartItemList = ContentService.GetRootContent().FirstOrDefault(x => x.Name == "CartItemList");

            if (cartItemList == null) return Results.StatusCode(500);

            var umbracoContext = UmbracoContextAccessor.GetRequiredUmbracoContext();
            var cartListRef = ContentService.GetRootContent().FirstOrDefault(x => x.Name == "CartItemList");
            var publishedCartItemList = umbracoContext.Content.GetById(cartListRef.Key);

            var existingCartItem = publishedCartItemList.Children()
                .FirstOrDefault(x => x.Value<string>("userId") == userId && x.Value<string>("snusId") == newItem.ItemId);

            if (existingCartItem != null)
            {
                var contentCartItem = ContentService.GetById(existingCartItem.Key);
                
                var currentAmount = contentCartItem.GetValue<int>("quantity");
                contentCartItem.SetValue("quantity", currentAmount + 1);
                ContentService.Save(contentCartItem);
                ContentService.Publish(contentCartItem, []);

                return Results.Ok($"Quantity of snus with id [{newItem.ItemId}] increased to {currentAmount + 1} in the cart.");
            }
            else
            {
                var cartItem = ContentService.Create($"CartItem-{newItem.ItemId}", cartItemList.Key, "cartItem");
                cartItem.SetValue("userId", userId);
                cartItem.SetValue("snusId", newItem.ItemId);
                cartItem.SetValue("quantity", 1);

                ContentService.Save(cartItem);
                ContentService.Publish(cartItem, []);

                var publishedContent = ContentService.GetById(cartItem.Id);
                if (publishedContent != null && publishedContent.Published)
                {
                    return Results.Ok($"Snus with id [{newItem.ItemId}] added to cart with quantity 1.");
                }
                else
                {
                    return Results.StatusCode(500);
                }
            }
        }

        public IResult RemoveFromCart(HttpContext context, CartRequest request)
        {
            var userId = Common.GetAuthHeader(context);

            if (string.IsNullOrEmpty(userId))
            {
                return Results.Unauthorized();
            }

            var umbracoContext = UmbracoContextAccessor.GetRequiredUmbracoContext();
            var cartListRef = ContentService.GetRootContent().FirstOrDefault(x => x.Name == "CartItemList");
            var cartItemList = umbracoContext.Content.GetById(cartListRef.Key);

            if (cartItemList == null) return Results.StatusCode(500);

            var cartItem = cartItemList.Children().FirstOrDefault(listItem => 
                listItem.Value<string>("snusId") == request.ItemId &&
                listItem.Value<string>("userId") == userId);

            if (cartItem == null)
            {
                return Results.NotFound($"Cart item with id [{request.ItemId}] not found for user.");
            }

            var contentCartItem = ContentService.GetById(cartItem.Key);

            if (contentCartItem == null) return Results.StatusCode(500);

            var currentQuantity = contentCartItem.GetValue<int>("quantity");

            if (currentQuantity > 1)
            {
                contentCartItem.SetValue("quantity", currentQuantity - 1);
                ContentService.Save(contentCartItem);
                ContentService.Publish(contentCartItem, []);
            }
            else
            {
                // If quantity reaches zero, delete the item
                ContentService.Delete(contentCartItem);
            }

            //ContentService.Delete(contentCartItem);

            return Results.Ok($"Snus with id [{request.ItemId}] removed from cart.");
        }
    }
}

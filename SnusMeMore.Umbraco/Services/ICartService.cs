
namespace SnusMeMore.Services
{
    public interface ICartService
    {
        IResult AddToCart(HttpContext context, CartRequest newItem);
        IResult GetCart(HttpContext context);
        IResult RemoveFromCart(HttpContext httpContext, CartRequest item);
    }
}
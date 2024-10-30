using System.Linq;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Extensions;

namespace SnusMeMore.Services
{
    public static class Common
    {
        public static string GetAuthHeader(HttpContext context)
        {
            var token = context.Request.Headers.Authorization.ToString().Replace("Token ", "").Trim();

            if (CartService.LoggedInUsers.Contains(token)) return token;
            else return string.Empty;
        }

        public static ICollection<SnusDTO> GetSnusDTO(ICollection<IPublishedContent> selection)
        {
            return selection.Select(x => new SnusDTO
            {
                SnusName = x.Value<string>("snusName"),
                Category = x.Value<string>("category"),
                Description = x.Value<string>("description"),
                Price = x.Value<string>("price"),
                ImageUrl = x.Value<string>("imageUrl"),
                Brand = x.Value<string>("brand"),
                Rating = x.Value<double>("rating"),
                SnusId = x.Key,
            }).ToList();
        }

        public static ICollection<CartSnusDTO> GetCartSnusDTO(ICollection<IPublishedContent> selection, Dictionary<string, int> quantities)
        {
            return selection.Select(x => new CartSnusDTO
            {
                SnusName = x.Value<string>("snusName"),
                Category = x.Value<string>("category"),
                Description = x.Value<string>("description"),
                Price = x.Value<string>("price"),
                ImageUrl = x.Value<string>("imageUrl"),
                Brand = x.Value<string>("brand"),
                Rating = x.Value<double>("rating"),
                SnusId = x.Key,
                Quantity = quantities.ContainsKey(x.Key.ToString()) ? quantities[x.Key.ToString()] : 1
            }).ToList();
        }

    }
}

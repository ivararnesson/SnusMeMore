using Umbraco.Cms.Core.Models.PublishedContent;

namespace SnusMeMore.Services
{
    public static class Common
    {
        public static string GetAuthHeader(HttpContext context)
        {
            return context.Request.Headers.Authorization.ToString().Replace("Token ", "").Trim();
        }

        public static object GetSnusDTO(ICollection<IPublishedContent> selection)
        {
            return selection.Select(x => new
            {
                SnusName = x.Value<string>("snusName"),
                Category = x.Value<string>("category"),
                Description = x.Value<string>("description"),
                Price = x.Value<string>("price"),
                ImageUrl = x.Value<string>("imageUrl"),
                Brand = x.Value<string>("brand"),
                Rating = x.Value<double>("rating"),
                Strength = x.Value<double>("strength"),
                SnusId = x.Key,
            }).ToList();
        }
    }
}

using Microsoft.AspNetCore.Http.HttpResults;
using Newtonsoft.Json;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;

namespace SnusMeMore.Services
{
    public class SnusService : ISnusService
    {
        private readonly IUmbracoContextAccessor UmbracoContextAccessor;
        private readonly IContentService ContentService;

        public SnusService(IUmbracoContextAccessor umbracoContextAccessor, IContentService contentService)
        {
            UmbracoContextAccessor = umbracoContextAccessor;
            ContentService = contentService;
        }

        public IResult GetNavbar()
        {
            var umbracoContext = UmbracoContextAccessor.GetRequiredUmbracoContext();
            var mainRef = ContentService.GetRootContent().FirstOrDefault(x => x.Name == "MainPage");
            var content = umbracoContext.Content.GetById(mainRef.Key);

            if (content == null)
            {
                return Results.NotFound();
            }

            var result = new
            {
                Title = content.Value<string>("title"),
                Home = content.Value<string>("home"),
                OptionOne = content.Value<string>("optionOne"),
                OptionTwo = content.Value<string>("optionTwo"),
                OptionThree = content.Value<string>("optionThree"),
                ShoppingCart = content.Value<string>("shoppingCart"),
            };

            return Results.Ok(result);
        }

        public IResult GetAllSnus()
        {
            var umbracoContext = UmbracoContextAccessor.GetRequiredUmbracoContext();

            var snusRef = ContentService.GetRootContent().FirstOrDefault(x => x.Name == "SnusList");
            var content = umbracoContext.Content.GetById(snusRef.Key);

            if (content == null)
            {
                return Results.NotFound();
            }

            var selection = content
                    .ChildrenOfType("SnusItem")
                    .Where(x => x.IsVisible())
                    .OrderByDescending(x => x.CreateDate);

            var result = Common.GetSnusDTO(selection.ToList());

            return Results.Ok(result);
        }

        public IResult AddRating(HttpContext context, Guid guid, AddRating ratingDto)
        {
            if (ratingDto.Rating < 1 || ratingDto.Rating > 5)
            {
                return Results.BadRequest("Invalid rating.");
            }

            var product = ContentService.GetById(guid);
            if (product == null)
            {
                return Results.NotFound("Snus item not found");
            }

            var userId = ratingDto.UserId;

            var ratingString = product.GetValue<string>("ratingsList");

            var ratingsDict = string.IsNullOrWhiteSpace(ratingString)
                ? new Dictionary<string, int>()
                : JsonConvert.DeserializeObject<Dictionary<string, int>>(ratingString);

            ratingsDict[userId] = ratingDto.Rating;

            ratingString = JsonConvert.SerializeObject(ratingsDict);

            product.SetValue("ratingsList", ratingString);

            ContentService.Save(product);
            ContentService.Publish(product, Array.Empty<string>(), 0);

            return Results.Ok(new { message = "Rating submitted!" });
        }


        public IResult GetAverageRating(Guid guid)
        {
            var product = ContentService.GetById(guid);

            if (product == null)
            {
                return Results.NotFound("Snus not found");
            }

            var ratingString = product.GetValue<string>("ratingsList");

            if (string.IsNullOrWhiteSpace(ratingString))
            {
                return Results.Ok(new { averageRating = 0 });
            }

            Dictionary<string, int> ratingsDict;

            try
            {
                ratingsDict = JsonConvert.DeserializeObject<Dictionary<string, int>>(ratingString);
            }
            catch (JsonException)
            {
                return Results.BadRequest("Invalid ratings format.");
            }

            if (ratingsDict == null || !ratingsDict.Any())
            {
                return Results.Ok(new { averageRating = 0 });
            }

            double average = ratingsDict.Values.Average();

            return Results.Ok(new { averageRating = average });
        }

    }
}

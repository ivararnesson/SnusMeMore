using Microsoft.AspNetCore.Http.HttpResults;
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
    }
}

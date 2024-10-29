﻿using Microsoft.AspNetCore.Http.HttpResults;
using Umbraco.Cms.Core.Media.EmbedProviders;
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
        public IResult GetSnusByName(string snusName)
        {
            var umbracoContext = UmbracoContextAccessor.GetRequiredUmbracoContext();
            var snusRef = ContentService.GetRootContent().FirstOrDefault(x => x.Name == "SnusList");
            var content = umbracoContext.Content.GetById(snusRef.Key);

            if (content == null)
            {
                return Results.NotFound();
            }

            var snusItem = content
                .ChildrenOfType("SnusItem")
                .FirstOrDefault(x => x.IsVisible() &&
                    x.Name.Equals(snusName, StringComparison.OrdinalIgnoreCase)); 

            if (snusItem == null)
            {
                return Results.NotFound();
            }

            var result = new
            {
                Id = snusItem.Key,
                Name = snusItem.Name,
                ImageUrl = snusItem.Value<string>("imageUrl"),
                Category = snusItem.Value<string>("category"),
                Brand = snusItem.Value<string>("brand"),
                Strength = snusItem.Value<string>("strength"),
                Price = snusItem.Value<decimal>("price"),
                Description = snusItem.Value<string>("description"),
                Rating = snusItem.Value<double>("rating")
            };

            //var result = Common.GetSnusDTO(snusItem.ToList());


            return Results.Ok(result);
        }

    }
}

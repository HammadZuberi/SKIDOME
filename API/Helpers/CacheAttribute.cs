using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Inerfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class CacheAttribute : Attribute, IAsyncActionFilter
    {


        private readonly int _timeToLiveSeconds;

        public CacheAttribute(int timeToLiveSeconds)
        {
            this._timeToLiveSeconds = timeToLiveSeconds;

        }
        //filters alows code to run pre or post processing pipelines
        //runs before action method called and after method is executed

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cahceService =
            context.HttpContext.RequestServices.GetRequiredService<IResponseCacheInterface>();
            var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);
            var cachedResponse = await cahceService.GetCacheResponseAsync(cacheKey);


            if (!string.IsNullOrEmpty(cachedResponse))
            {
                var contextResult = new ContentResult
                {
                    Content = cachedResponse,
                    ContentType = "application/json",
                    StatusCode = 200
                };
                context.Result = contextResult;
                return;
            }

            var executedContext = await next();//move the request to the controller pipeline

            if (executedContext.Result is OkObjectResult okObjectResult)
            {
                //cache again
                await cahceService.CacheResponseAsync(cacheKey,
                 okObjectResult.Value, TimeSpan.FromSeconds(_timeToLiveSeconds));
            }

        }

        private string GenerateCacheKeyFromRequest(HttpRequest request)
        {
            //organise the querystring in order to get same cahce key

            var keybuilder = new StringBuilder();
            keybuilder.Append($"{request.Path}");

            foreach (var (key, value) in request.Query.OrderBy(x => x.Key))
            {
                keybuilder.Append($"|{key}-{value}");
            }

            return keybuilder.ToString();
        }
    }
}
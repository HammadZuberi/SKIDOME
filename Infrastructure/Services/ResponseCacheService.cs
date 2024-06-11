using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Inerfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class ResponseCacheService : IResponseCacheInterface
    {
        private readonly IDatabase database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            database = redis.GetDatabase();

        }
        public async Task CacheResponseAsync(string cachekey, object response, TimeSpan timeToLive)
        {

            if (response == null)
            {
                return;
            }

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };


            var serialisedResponse = JsonSerializer.Serialize(response,options);
            await database.
            StringSetAsync(cachekey, serialisedResponse, timeToLive);


        }

        public async Task<string> GetCacheResponseAsync(string cachekey)
        {

            var cachedResponse = await database.StringGetAsync(cachekey);
          
            if (cachedResponse.IsNullOrEmpty) return null;
         
            return cachedResponse;
        }
    }
}
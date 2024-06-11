using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Inerfaces
{
    public interface IResponseCacheInterface
    {
        public Task CacheResponseAsync(string cachekey, object response, TimeSpan timeToLive);
        public Task<string> GetCacheResponseAsync(string cachekey);

    }
}
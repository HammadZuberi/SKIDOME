using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Inerfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();

        }

        public async Task<bool> DeleteCustomerBasket(string BasketId)
        {
            return await _database.KeyDeleteAsync(BasketId);
        }

        public async Task<CustomerBasket> GetCustomerBasket(string BasketId)
        {

            var data = await _database.StringGetAsync(BasketId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);


        }

        public async Task<CustomerBasket> UpdateCustomerBasket(CustomerBasket basket)
        {
            //replace the redis data with the new one or else it creates a new basket object
            var serializedata = JsonSerializer.Serialize<CustomerBasket>(basket);
            var created = await _database.StringSetAsync(basket.Id, serializedata,TimeSpan.FromDays(30));

            if(!created) return null;

            return await GetCustomerBasket(basket.Id);

        }
    }
}
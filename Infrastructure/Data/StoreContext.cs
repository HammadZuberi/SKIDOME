
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        
        public StoreContext(DbContextOptions<StoreContext> option): base(option)
        {
            
        }

        public DbSet<Product> Products { get; set; }
    }

}
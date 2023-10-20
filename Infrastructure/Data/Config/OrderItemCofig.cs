using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderItemCofig : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {


            builder.OwnsOne(i=> i.ItemOrdered,io=> {io.WithOwner();});
            
            builder.Property(i=>i.Price).HasColumnType("decibel(18,2)");

        }
    }
}
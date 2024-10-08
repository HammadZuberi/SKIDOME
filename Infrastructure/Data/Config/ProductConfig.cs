using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {

            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(250);
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.Property(p => p.Price).IsRequired().HasColumnType("numeric(18,2)");

            builder.HasOne(p => p.ProductBrand).WithMany()
            .HasForeignKey(p => p.ProductBrandId);

            builder.HasOne(p => p.ProductType).WithMany()
            .HasForeignKey(p => p.ProductTypeId);
        }
    }
}
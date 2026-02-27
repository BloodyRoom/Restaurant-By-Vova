using Domain.Entities;
using Domain.Entities.Delivery;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;

namespace Domain;

public class RestaurantDbContext : IdentityDbContext<UserEntity, RoleEntity, long,
        IdentityUserClaim<long>, UserRoleEntity, UserLoginEntity,
        IdentityRoleClaim<long>, IdentityUserToken<long>>
{
    public RestaurantDbContext(DbContextOptions<RestaurantDbContext> dbContextOptions)
        : base(dbContextOptions) { }

    public DbSet<CategoryEntity> Categories { get; set; }
    public DbSet<ProductEntity> Products { get; set; }
    public DbSet<CartEntity> Carts { get; set; }
    public DbSet<DeliveryEntity> Delivery { get; set; }
    public DbSet<DeliveryProductEntity> DeliveryProducts { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<UserRoleEntity>(ur =>
        {
            ur.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(r => r.RoleId)
                .IsRequired();

            ur.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(u => u.UserId)
                .IsRequired();
        });

        builder.Entity<UserLoginEntity>(b =>
        {
            b.HasOne(l => l.User)
                .WithMany(u => u.UserLogins)
                .HasForeignKey(l => l.UserId)
                .IsRequired();
        });



        builder.Entity<DeliveryProductEntity>()
            .HasKey(dp => new { dp.DeliveryId, dp.ProductId });

        builder.Entity<DeliveryProductEntity>()
            .HasOne(dp => dp.Delivery)
            .WithMany(d => d.DeliveryProducts)
            .HasForeignKey(dp => dp.DeliveryId);

        builder.Entity<DeliveryProductEntity>()
            .HasOne(dp => dp.Product)
            .WithMany(p => p.DeliveryProducts)
            .HasForeignKey(dp => dp.ProductId);

        builder.Entity<DeliveryEntity>()
            .Property(d => d.Status)
            .HasConversion<string>();
    }
}

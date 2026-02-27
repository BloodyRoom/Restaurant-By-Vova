using Domain.Constants;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Domain.Data;

public class SeedAdmin
{
    public static async Task SeedAsync(
        UserManager<UserEntity> userManager,
        RoleManager<RoleEntity> roleManager,
        IConfiguration configuration)
    {
        if (!await roleManager.RoleExistsAsync(Roles.Admin))
        {
            await roleManager.CreateAsync(new RoleEntity
            {
                Name = Roles.Admin
            });
        }

        string adminEmail = configuration["AdminSettings:Email"] ?? "admin@admin.com";
        string adminPassword = configuration["AdminSettings:Password"] ?? "Admin123!";
        string adminFirstName = configuration["AdminSettings:FirstName"] ?? "Super";
        string adminLastName = configuration["AdminSettings:LastName"] ?? "Admin";

        var admin = await userManager.FindByEmailAsync(adminEmail);

        if (admin == null)
        {
            admin = new UserEntity
            {
                FirstName = adminFirstName,
                LastName = adminLastName,
                UserName = adminEmail,
                Email = adminEmail,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(admin, adminPassword);

            if (!result.Succeeded)
            {
                var errors = string.Join("\n",
                    result.Errors.Select(e => e.Description));

                throw new Exception(errors);
            }
        }

        if (!await userManager.IsInRoleAsync(admin, Roles.Admin))
        {
            await userManager.AddToRoleAsync(admin, Roles.Admin);
        }
    }
}

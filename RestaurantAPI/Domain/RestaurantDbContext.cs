using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain;

public class RestaurantDbContext :DbContext
{
    public RestaurantDbContext(DbContextOptions<RestaurantDbContext> dbContextOptions)
        : base(dbContextOptions) { }
}

using Core.Interfaces;
using Core.Mappers;
using Core.Queries.Categories;
using Core.Repositories;
using Core.Services;
using Domain;
using Domain.Data;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<RestaurantDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("RestaurantConnection")));



builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<RestaurantDbContext>()
    .AddDefaultTokenProviders();


builder.Services.AddOpenApi(opt =>
{
    opt.AddDocumentTransformer((document, context, cancellayionToken) =>
    {
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();

        document.Components.SecuritySchemes["Bearer"] = new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Мухамед жвт"
        };

        document.Security ??= new List<OpenApiSecurityRequirement>();
        document.Security.Add(
            new OpenApiSecurityRequirement
            {
                [new OpenApiSecuritySchemeReference("Bearer", document)] = new List<string>()
            });

        return Task.CompletedTask;
    });
});

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = false,
            ValidateLifetime = false,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? ""))
        };
    });
builder.Services.AddAuthorization();


builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));

builder.Services.AddAutoMapper(typeof(AccountMapper));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetCategoriesQuery).Assembly));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(opt =>
    {
        opt.SwaggerEndpoint("/openapi/v1.json", "api");
    });
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var userManager = services.GetRequiredService<UserManager<UserEntity>>();
    var roleManager = services.GetRequiredService<RoleManager<RoleEntity>>();
    var configuration = services.GetRequiredService<IConfiguration>();

    await SeedAdmin.SeedAsync(userManager, roleManager, configuration);
}


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

var dir = builder.Configuration["ImagesDir"];
string path = Path.Combine(Directory.GetCurrentDirectory(), dir);
Directory.CreateDirectory(path);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(path),
    RequestPath = $"/{dir}"
});

app.Run();
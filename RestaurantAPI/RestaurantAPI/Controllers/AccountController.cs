using AutoMapper;
using Core.Constants;
using Core.Interfaces;
using Core.Models.Account;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace RestaurantAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(UserManager<UserEntity> userManager,
        IMapper mapper,
        IJwtTokenService jwtTokenService,
        RoleManager<RoleEntity> roleManager) : Controller
{

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return BadRequest("Виникла помилка під час входу, повторіть спробу пізніше.");
        }
        var token = await jwtTokenService.CreateTokenAsync(user);
        return Ok(new
        {
            token,
        });
    }



    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterModel model)
    {
        var user = mapper.Map<UserEntity>(model);

        var result = await userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            try
            {
                result = await userManager.AddToRoleAsync(user, Roles.User);
                if (result.Succeeded)
                {
                    var token = await jwtTokenService.CreateTokenAsync(user);
                    return Ok(new
                    {
                        token
                    });
                }
            }
            catch (InvalidOperationException) // коли немає створеної ролі в бд, то створюємо її
            {
                result = await roleManager.CreateAsync(new RoleEntity { Name = Roles.User });
                if (result.Succeeded)
                {
                    result = await userManager.AddToRoleAsync(user, Roles.User);
                    if (result.Succeeded)
                    {
                        var token = await jwtTokenService.CreateTokenAsync(user);
                        return Ok(new
                        {
                            token
                        });
                    }
                }
            }
        }
        else
        {
            string errorMsg = "";
            foreach (var error in result.Errors)
            {
                errorMsg += $"{error.Description}\n";
            }
            return BadRequest(errorMsg);
        }

        return BadRequest("Виникла помилка під час реєстрації, повторіть спробу пізніше.");
    }
}

using AutoMapper;
using Core.Commands.Account;
using Core.Constants;
using Core.Interfaces;
using Core.Models.Account;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace RestaurantAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(UserManager<UserEntity> userManager,
        IMapper mapper,
        IJwtTokenService jwtTokenService,
        RoleManager<RoleEntity> roleManager,
        IMediator mediator) : Controller
{

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var result = await mediator.Send(new LoginCommand(model));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
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

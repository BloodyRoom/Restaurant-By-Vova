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
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var result = await mediator.Send(new RegisterCommand(model));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
    }
}

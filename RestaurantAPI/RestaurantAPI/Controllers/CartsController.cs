
using Core.Commands.Carts;
using Core.Commands.Categories;
using Core.Commands.Products;
using Core.Helpers;
using Core.Models.Carts;
using Core.Models.Categories;
using Core.Models.Products;
using Core.Queries.Carts;
using Core.Queries.Categories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RestaurantAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CartsController(IMediator mediator) : Controller
{
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Get() 
        => Ok(await mediator.Send(new GetCartsQuery(User.GetUserId())));

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CartCreateModel model)
    {
        var result = await mediator.Send(new CartCreateCommand(model, User.GetUserId()));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
    }

    [HttpPatch]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] CartUpdateModel model)
    {
        var result = await mediator.Send(new CartUpdateCommand(model, User.GetUserId()));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
    }


    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> Delete([FromBody] CartDeleteModel model)
        => Ok(await mediator.Send(new CartDeleteCommand(model, User.GetUserId())));
}

using Core.Commands.Carts;
using Core.Commands.Delivery;
using Core.Helpers;
using Core.Models.Carts;
using Core.Models.Delivery;
using Core.Queries.Carts;
using Core.Queries.Delivery;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RestaurantAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class DeliveryController(IMediator mediator) : Controller
{
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Get()
    => Ok(await mediator.Send(new GetDeliveryQuery(User.GetUserId())));

    [HttpGet]
    public async Task<IActionResult> GetAll()
    => Ok(await mediator.Send(new GetAllDeliveryQuery()));


    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] DeliveryCreateModel model)
    {
        var result = await mediator.Send(new DeliveryCreateCommand(model, User.GetUserId()));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
    }


    [HttpPatch]
    public async Task<IActionResult> Update([FromBody] DeliveryUpdateModel model)
    {
        var result = await mediator.Send(new DeliveryUpdateCommand(model));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
    }
}

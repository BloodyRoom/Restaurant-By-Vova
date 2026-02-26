using Core.Helpers;
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
}

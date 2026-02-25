
using Core.Helpers;
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
}

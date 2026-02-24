using Core.Queries.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace RestaurantAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class ProductsController(IMediator mediator) : Controller
{
    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok(await mediator.Send(new GetProductsQuery()));
}

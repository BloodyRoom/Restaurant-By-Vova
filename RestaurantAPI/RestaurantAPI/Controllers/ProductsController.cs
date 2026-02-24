using Core.Commands.Categories;
using Core.Commands.Products;
using Core.Models.Categories;
using Core.Models.Products;
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

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] ProductCreateModel model)
    {
        var result = await mediator.Send(new ProductCreateCommand(model));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
    }

    [HttpPatch]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update([FromForm] ProductUpdateModel model)
    {
        var result = await mediator.Send(new ProductUpdateCommand(model));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
    }
}

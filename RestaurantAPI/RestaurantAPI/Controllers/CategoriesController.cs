using Core.Commands.Categories;
using Core.Models.Categories;
using Core.Queries.Categories;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace RestaurantAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CategoriesController(IMediator mediator) : Controller
{
    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok(await mediator.Send(new GetCategoriesQuery()));

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] CategoryCreateModel model)
        => Ok(await mediator.Send(new CategoryCreateCommand(model)));

    [HttpPatch]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update([FromForm] CategoryUpdateModel model)
    {
        var result = await mediator.Send(new CategoryUpdateCommand(model));

        if (!result.IsSuccess) return BadRequest(result.Error);

        return Ok(result.Value);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] CategoryDeleteModel model)
        => Ok(await mediator.Send(new CategoryDeleteCommand(model)));
}

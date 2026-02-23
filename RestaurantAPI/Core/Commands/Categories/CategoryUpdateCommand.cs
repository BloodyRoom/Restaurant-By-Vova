using Core.Models;
using Core.Models.Categories;
using MediatR;

namespace Core.Commands.Categories;

public record CategoryUpdateCommand(CategoryUpdateModel model)
    : IRequest<Result<CategoryModel>>;

using Core.Models.Categories;
using MediatR;

namespace Core.Commands.Categories;

public record CategoryCreateCommand(CategoryCreateModel model)
    : IRequest<CategoryModel>;

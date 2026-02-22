using Core.Models.Categories;
using MediatR;

namespace Core.Queries.Categories;

public record GetCategoriesQuery()
    : IRequest<IEnumerable<CategoryModel>>;

using Core.Models.Categories;
using MediatR;

namespace Core.Queries.Categories;

public record GetCategoriesQuery(long typeId)
    : IRequest<IEnumerable<CategoryModel>>;

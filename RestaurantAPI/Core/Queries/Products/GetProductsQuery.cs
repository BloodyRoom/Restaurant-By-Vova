using Core.Models.Products;
using MediatR;

namespace Core.Queries.Products;

public record GetProductsQuery : IRequest<IEnumerable<ProductModel>>;
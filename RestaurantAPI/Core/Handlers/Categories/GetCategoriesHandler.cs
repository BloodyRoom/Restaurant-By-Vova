using AutoMapper;
using Core.Interfaces;
using Core.Models.Categories;
using Core.Queries.Categories;
using Domain;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Core.Handlers.Categories;

public class GetCategoriesHandler(IGenericRepository<CategoryEntity, long> repository, 
    IMapper mapper) : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryModel>>
{
    public async Task<IEnumerable<CategoryModel>> Handle(
        GetCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repository.ListAllAsync();
        return mapper.Map<IEnumerable<CategoryModel>>(entities);
    }
}

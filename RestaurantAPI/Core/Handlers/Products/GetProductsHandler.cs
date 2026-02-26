using AutoMapper;
using Core.Interfaces;
using Core.Models.Categories;
using Core.Models.Products;
using Core.Queries.Categories;
using Core.Queries.Products;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Products;

public class GetProductsHandler(IGenericRepository<ProductEntity, long> repository,
    IMapper mapper) : IRequestHandler<GetProductsQuery, IEnumerable<ProductModel>>
{
    public async Task<IEnumerable<ProductModel>> Handle(
        GetProductsQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repository.ListAllAsync<ProductModel>();
        return mapper.Map<IEnumerable<ProductModel>>(entities);
    }
}


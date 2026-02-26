using AutoMapper;
using Core.Interfaces;
using Core.Models.Carts;
using Core.Models.Categories;
using Core.Queries.Carts;
using Core.Queries.Categories;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Carts;

public class GetCartsHandler(IGenericRepository<CartEntity, long> repository) : IRequestHandler<GetCartsQuery, IEnumerable<CartModel>>
{
    public async Task<IEnumerable<CartModel>> Handle(
        GetCartsQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repository.ListAllAsync<CartModel>(x => x.UserId == request.userId);
        return entities;
    }
}

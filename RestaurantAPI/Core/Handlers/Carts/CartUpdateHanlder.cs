using AutoMapper;
using Core.Commands.Carts;
using Core.Interfaces;
using Core.Models;
using Core.Models.Carts;
using Core.Models.Products;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Carts;

public class CartUpdateHandler(
    IGenericRepository<CartEntity, long> repository,
    IGenericRepository<ProductEntity, long> productRepository,
    IMapper mapper)
    : IRequestHandler<CartUpdateCommand, Result<CartModel>>
{
    public async Task<Result<CartModel>> Handle(CartUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(request.model.Id);

        if (entity == null)
            return Result<CartModel>.Failure("Cart item not found");

        if (request.model.Count <= 0)
            return Result<CartModel>.Failure("Count must be > 0");

        if (entity.UserId != request.userId)
            return Result<CartModel>.Failure("Access denied");

        entity.Count = request.model.Count;

        await repository.UpdateAsync(entity);

        var product = await productRepository.GetByIdAsync(entity.ProductId);
        var result = mapper.Map<CartModel>(entity);
        result.Product = mapper.Map<ProductModel>(product);

        return Result<CartModel>.Success(result);
    }
}
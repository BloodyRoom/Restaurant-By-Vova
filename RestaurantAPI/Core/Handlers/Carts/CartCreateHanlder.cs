using AutoMapper;
using Core.Commands.Carts;
using Core.Commands.Categories;
using Core.Interfaces;
using Core.Models;
using Core.Models.Carts;
using Core.Models.Categories;
using Core.Models.Products;
using Domain.Entities;
using Domain.Entities.Identity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Carts;

public class CartCreateHanlder(
    IGenericRepository<CartEntity, long> repository,
    IGenericRepository<ProductEntity, long> productRepository,
    IMapper mapper) : IRequestHandler<CartCreateCommand, Result<CartModel>>
{
    public async Task<Result<CartModel>> Handle(CartCreateCommand request, CancellationToken cancellationToken)
    {
        var entity = mapper.Map<CartEntity>(request.model);
        entity.UserId = request.userId;

        var product = await productRepository.GetByIdAsync(request.model.ProductId);

        if (product == null)
            return Result<CartModel>.Failure("Wrong product id");

        if (request.model.Count <= 0)
            return Result<CartModel>.Failure("Count must be > 0");

        await repository.AddAsync(entity);
        await repository.SaveChangesAsync();

        var result = mapper.Map<CartModel>(entity);
        result.Product = mapper.Map<ProductModel>(product);

        return Result<CartModel>.Success(result);
    }
}

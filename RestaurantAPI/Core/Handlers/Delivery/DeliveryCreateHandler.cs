using AutoMapper;
using Core.Commands.Carts;
using Core.Commands.Delivery;
using Core.Interfaces;
using Core.Models;
using Core.Models.Carts;
using Core.Models.Delivery;
using Core.Models.Products;
using Domain.Entities;
using Domain.Entities.Delivery;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Delivery;

public class DeliveryCreateHanlder(
    IGenericRepository<DeliveryEntity, long> repository,
    IGenericRepository<CartEntity, long> cartRepository,
    IMapper mapper) : IRequestHandler<DeliveryCreateCommand, Result<DeliveryModel>>
{
    public async Task<Result<DeliveryModel>> Handle(
    DeliveryCreateCommand request,
    CancellationToken cancellationToken)
    {
        var entity = mapper.Map<DeliveryEntity>(request.model);
        entity.Status = DeliveryStatus.Created;
        entity.UserId = request.userId;

        var userCart = await cartRepository
            .ListAllAsync(x => x.UserId == request.userId);

        if (userCart == null || userCart.Count == 0)
            return Result<DeliveryModel>.Failure("Cart is empty");

        foreach (var cartItem in userCart)
        {
            entity.DeliveryProducts.Add(new DeliveryProductEntity
            {
                ProductId = cartItem.ProductId,
                Count = cartItem.Count
            });
            await cartRepository.DeleteAsync(cartItem.Id);
        }

        await repository.AddAsync(entity);
        await repository.SaveChangesAsync();

        return Result<DeliveryModel>.Success(await repository.GetByIdAsync<DeliveryModel>(entity.Id) ?? new());
    }
}
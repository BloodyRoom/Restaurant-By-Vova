using AutoMapper;
using Core.Commands.Carts;
using Core.Commands.Delivery;
using Core.Interfaces;
using Core.Models;
using Core.Models.Carts;
using Core.Models.Delivery;
using Domain.Entities;
using Domain.Entities.Delivery;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Delivery;

public class DeliveryUpdateHandler(
    IGenericRepository<DeliveryEntity, long> repository,
    IMapper mapper) : IRequestHandler<DeliveryUpdateCommand, Result<DeliveryModel>>
{
    public async Task<Result<DeliveryModel>> Handle(
    DeliveryUpdateCommand request,
    CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(request.model.Id);

        if (entity == null)
            return Result<DeliveryModel>.Failure("Delivery not found");

        if (!Enum.TryParse<DeliveryStatus>(request.model.Status.ToString(), true, out var status))
        {
            return Result<DeliveryModel>.Failure("Invalid delivery status");
        }

        entity.Status = status;

        await repository.UpdateAsync(entity);

        return Result<DeliveryModel>.Success(
            await repository.GetByIdAsync<DeliveryModel>(entity.Id) ?? new());
    }
}

using Core.Commands.Carts;
using Core.Commands.Delivery;
using Core.Interfaces;
using Domain.Entities;
using Domain.Entities.Delivery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Delivery;

public class DeliveryDeleteHandler(IGenericRepository<DeliveryEntity, long> repository)
    : IRequestHandler<DeliveryDeleteCommand, bool>
{
    public async Task<bool> Handle(DeliveryDeleteCommand request, CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(request.model.Id);

        if (entity == null)
            return false;

        await repository.DeleteAsync(request.model.Id);

        return true;
    }
}
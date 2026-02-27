using Core.Interfaces;
using Core.Models.Carts;
using Core.Models.Delivery;
using Core.Queries.Carts;
using Core.Queries.Delivery;
using Domain.Entities;
using Domain.Entities.Delivery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Delivery;

public class GetDeliveryHandler(IGenericRepository<DeliveryEntity, long> repository) : IRequestHandler<GetDeliveryQuery, IEnumerable<DeliveryModel>>
{
    public async Task<IEnumerable<DeliveryModel>> Handle(
        GetDeliveryQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repository.ListAllAsync<DeliveryModel>(x => x.UserId == request.userId);
        return entities;
    }
}

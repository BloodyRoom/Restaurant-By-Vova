using Core.Interfaces;
using Core.Models.Delivery;
using Core.Queries.Delivery;
using Domain.Entities.Delivery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Delivery;

public class GetAllDeliveryHandler(IGenericRepository<DeliveryEntity, long> repository) 
    : IRequestHandler<GetAllDeliveryQuery, IEnumerable<DeliveryWithUserModel>>
{
    public async Task<IEnumerable<DeliveryWithUserModel>> Handle(
        GetAllDeliveryQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repository.ListAllAsync<DeliveryWithUserModel>();
        return entities;
    }
}

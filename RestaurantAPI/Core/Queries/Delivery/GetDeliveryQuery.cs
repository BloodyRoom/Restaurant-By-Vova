using Core.Models.Carts;
using Core.Models.Delivery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Queries.Delivery;

public record GetDeliveryQuery(long userId)
    : IRequest<IEnumerable<DeliveryModel>>;
using Core.Models.Delivery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Queries.Delivery;

public record GetAllDeliveryQuery()
    : IRequest<IEnumerable<DeliveryWithUserModel>>;
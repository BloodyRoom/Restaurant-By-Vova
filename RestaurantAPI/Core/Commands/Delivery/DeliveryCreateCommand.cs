using Core.Models;
using Core.Models.Carts;
using Core.Models.Delivery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Delivery;

public record DeliveryCreateCommand(DeliveryCreateModel model, long userId)
    : IRequest<Result<DeliveryModel>>;
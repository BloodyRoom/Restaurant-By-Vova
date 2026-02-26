using Core.Models;
using Core.Models.Delivery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Delivery;

public record DeliveryUpdateCommand(DeliveryUpdateModel model)
    : IRequest<Result<DeliveryModel>>;
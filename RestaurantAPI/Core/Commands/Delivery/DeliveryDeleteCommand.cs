using Core.Models;
using Core.Models.Delivery;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Delivery;

public record DeliveryDeleteCommand(DeliveryDeleteModel model)
    : IRequest<bool>;
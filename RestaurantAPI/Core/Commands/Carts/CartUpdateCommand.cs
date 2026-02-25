using Core.Models;
using Core.Models.Carts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Carts;

public record CartUpdateCommand(CartUpdateModel model, long userId)
    : IRequest<Result<CartModel>>;
using Core.Models;
using Core.Models.Carts;
using Core.Models.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Commands.Carts;

public record CartCreateCommand(CartCreateModel model, long userId)
    : IRequest<Result<CartModel>>;

using Core.Models.Carts;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Queries.Carts;

public record GetCartsQuery(long userId)
    : IRequest<IEnumerable<CartModel>>;
using Core.Commands.Carts;
using Core.Interfaces;
using Core.Models;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Carts;

public class CartDeleteHandler(IGenericRepository<CartEntity, long> repository)
    : IRequestHandler<CartDeleteCommand, bool>
{
    public async Task<bool> Handle(CartDeleteCommand request, CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(request.model.Id);

        if (entity == null)
            return false;

        if (entity.UserId != request.userId)
            return false;

        await repository.DeleteAsync(request.model.Id);

        return true;
    }
}
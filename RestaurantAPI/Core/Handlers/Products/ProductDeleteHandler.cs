using Core.Commands.Categories;
using Core.Commands.Products;
using Core.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Products;

public class ProductDeleteHandler(IGenericRepository<ProductEntity, long> repository)
    : IRequestHandler<ProductDeleteCommand, bool>
{
    public async Task<bool> Handle(ProductDeleteCommand request, CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(request.model.Id);

        if (entity != null)
        {
            await repository.DeleteAsync(request.model.Id);
            return true;
        }

        return false;
    }
}
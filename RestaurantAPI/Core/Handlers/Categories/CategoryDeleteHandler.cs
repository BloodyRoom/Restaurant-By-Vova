using AutoMapper;
using Core.Commands.Categories;
using Core.Interfaces;
using Core.Models.Categories;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Categories;

public class CategoryDeleteHandler(IGenericRepository<CategoryEntity, long> repository) 
    : IRequestHandler<CategoryDeleteCommand, bool>
{
    public async Task<bool> Handle(CategoryDeleteCommand request, CancellationToken cancellationToken)
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

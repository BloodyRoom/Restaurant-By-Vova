using AutoMapper;
using Core.Commands.Categories;
using Core.Interfaces;
using Core.Models;
using Core.Models.Categories;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Categories;

public class CategoryUpdateCommandHandler(
    IGenericRepository<CategoryEntity, long> repository,
    IMapper mapper,
    IImageService imageService) : IRequestHandler<CategoryUpdateCommand, Result<CategoryModel>>
{
    public async Task<Result<CategoryModel>> Handle(CategoryUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(request.model.Id);

        if (entity == null)
            return Result<CategoryModel>.Failure("wrong data");

        if (request.model.Name != null)
            entity.Name = request.model.Name;

        if (request.model.Image != null)
        {
            if (!string.IsNullOrEmpty(entity.Image))
                await imageService.DeleteImageAsync(entity.Image);

            entity.Image = await imageService.SaveImageAsync(request.model.Image);
        }

        await repository.UpdateAsync(entity);

        return Result<CategoryModel>.Success(mapper.Map<CategoryModel>(entity));
    }
}

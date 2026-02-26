using AutoMapper;
using Core.Commands.Categories;
using Core.Commands.Products;
using Core.Interfaces;
using Core.Models;
using Core.Models.Categories;
using Core.Models.Products;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Handlers.Products;

public class ProductUpdateHandler(
    IGenericRepository<ProductEntity, long> repository,
    IGenericRepository<CategoryEntity, long> categoryRepository,
    IMapper mapper,
    IImageService imageService) : IRequestHandler<ProductUpdateCommand, Result<ProductModel>>
{
    public async Task<Result<ProductModel>> Handle(ProductUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await repository.GetByIdAsync(request.model.Id);

        if (entity == null)
            return Result<ProductModel>.Failure("wrong data");

        if (request.model.CategoryId != null)
        {
            var category = await categoryRepository.GetByIdAsync(request.model.CategoryId ?? -1);
            if (category != null)
            {
                entity.CategoryId = category.Id;
                entity.Category = category;
            }
        }

        if (request.model.Name != null)
            entity.Name = request.model.Name;
        
        if (request.model.Description != null)
            entity.Description = request.model.Description;
        
        if (request.model.Price != null)
            entity.Price = request.model.Price ?? entity.Price;

        if (request.model.Image != null)
        {
            if (!string.IsNullOrEmpty(entity.Image))
                await imageService.DeleteImageAsync(entity.Image);

            entity.Image = await imageService.SaveImageAsync(request.model.Image);
        }

        await repository.UpdateAsync(entity);

        return Result<ProductModel>.Success(mapper.Map<ProductModel>(entity));
    }
}


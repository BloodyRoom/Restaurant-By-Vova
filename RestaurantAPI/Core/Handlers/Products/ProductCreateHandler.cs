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

public class ProductCreateHandler(
    IGenericRepository<ProductEntity, long> repository,
    IGenericRepository<CategoryEntity, long> categoryRepository,
    IMapper mapper,
    IImageService imageService) : IRequestHandler<ProductCreateCommand, Result<ProductModel>>
{
    public async Task<Result<ProductModel>> Handle(ProductCreateCommand request, CancellationToken cancellationToken)
    {
        var entity = mapper.Map<ProductEntity>(request.model);
        var category = await categoryRepository.GetByIdAsync(entity.CategoryId);

        if (category == null)
            return Result<ProductModel>.Failure("Wrong category id");

        if (request.model.Image != null)
        {
            entity.Image = await imageService.SaveImageAsync(request.model.Image);
        }

        await repository.AddAsync(entity);
        await repository.SaveChangesAsync();

        var result = mapper.Map<ProductModel>(entity);
        result.Category = mapper.Map<CategoryModel>(category);

        return Result<ProductModel>.Success(result);
    }
}
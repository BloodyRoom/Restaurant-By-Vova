using AutoMapper;
using Core.Commands.Categories;
using Core.Interfaces;
using Core.Models.Categories;
using Domain.Entities;
using MediatR;

namespace Core.Handlers.Categories;

public class CategoryCreateHandler(
    IGenericRepository<CategoryEntity, long> repository,
    IMapper mapper,
    IImageService imageService) : IRequestHandler<CategoryCreateCommand, CategoryModel>
{
    public async Task<CategoryModel> Handle(CategoryCreateCommand request, CancellationToken cancellationToken)
    {
        var entity = mapper.Map<CategoryEntity>(request.model);

        if (request.model.Image != null)
        {
            entity.Image = await imageService.SaveImageAsync(request.model.Image);
        }

        await repository.AddAsync(entity);
        await repository.SaveChangesAsync();
        var result = mapper.Map<CategoryModel>(entity);
        return result;
    }
}

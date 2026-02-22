using AutoMapper;
using Core.Models.Categories;
using Domain.Entities;

namespace Core.Mappers;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryModel>();
    }

}

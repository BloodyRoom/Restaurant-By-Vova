using AutoMapper;
using Core.Models.Categories;
using Domain.Entities;

namespace Core.Mappers;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryModel>();
        CreateMap<CategoryCreateModel, CategoryEntity>()
            .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()))
            .ForMember(x => x.Image, opt => opt.Ignore());
    }

}

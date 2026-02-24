using AutoMapper;
using Core.Models.Categories;
using Core.Models.Products;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Mappers;

public class ProductMapper : Profile
{
    public ProductMapper()
    {
        CreateMap<ProductEntity, ProductModel>();
        CreateMap<ProductCreateModel, ProductEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore());
    }
}

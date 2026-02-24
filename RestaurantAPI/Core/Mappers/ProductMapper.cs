using AutoMapper;
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
        CreateMap<ProductEntity, ProductModel>()
            .ForMember(x => x.Category, opt => opt.MapFrom(x => x.Category));
    }
}

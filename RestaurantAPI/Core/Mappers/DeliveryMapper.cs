using AutoMapper;
using Core.Models.Carts;
using Core.Models.Delivery;
using Core.Models.Products;
using Domain.Entities;
using Domain.Entities.Delivery;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Mappers;

public class DeliveryMapper : Profile
{
    public DeliveryMapper()
    {
        CreateMap<DeliveryEntity, DeliveryModel>()
            .ForMember(x => x.Products,
                opt => opt.MapFrom(x => x.DeliveryProducts
                    .Select(x => x.Product)));

        CreateMap<DeliveryEntity, DeliveryWithUserModel>()
            .ForMember(x => x.Products, opt => opt.MapFrom(x => x.DeliveryProducts.Select(x => x.Product)))
            .ForMember(x => x.User, opt => opt.MapFrom(x => x.User));
    }

}
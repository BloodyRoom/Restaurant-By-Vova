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
            .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.DeliveryProducts));

        CreateMap<DeliveryEntity, DeliveryWithUserModel>()
            .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.DeliveryProducts))
            .ForMember(x => x.User, opt => opt.MapFrom(x => x.User));

        CreateMap<DeliveryProductEntity, DeliveryProductModel>()
            .ForMember(dest => dest.Product,
                opt => opt.MapFrom(src => src.Product))
            .ForMember(dest => dest.Count,
                opt => opt.MapFrom(src => src.Count));


        CreateMap<DeliveryCreateModel, DeliveryEntity>();
    }

}
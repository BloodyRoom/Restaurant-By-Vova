using AutoMapper;
using Core.Models.Carts;
using Core.Models.Categories;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Mappers;

public class CartMapper : Profile
{
    public CartMapper()
    {
        CreateMap<CartEntity, CartModel>();
        CreateMap<CartCreateModel, CartEntity>();
    }

}

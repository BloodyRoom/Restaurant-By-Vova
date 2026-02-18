using AutoMapper;
using Core.Models.Account;
using Domain.Entities.Identity;

namespace Core.Mappers;

public class AccountMapper : Profile
{
    public AccountMapper()
    {
        CreateMap<RegisterModel, UserEntity>()
            .ForMember(opt => opt.UserName, opt => opt.MapFrom(x => x.Email));
    }

}

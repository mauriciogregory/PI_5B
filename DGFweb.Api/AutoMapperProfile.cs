using AutoMapper;
using Microsoft.EntityFrameworkCore;
using DGFweb.Api.Data;
using DGFweb.Api.Models;
using DGFweb.Api.Dto;

namespace DGFweb.Api;

public class AutoMapperProfile: Profile 
{
    public AutoMapperProfile() 
    {
        CreateMap<UserDTO, User>();
        CreateMap<User,UserDTO>();
        CreateMap<LogDTO, Log>();
    }
}
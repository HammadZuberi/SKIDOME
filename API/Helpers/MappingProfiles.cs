using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {
            //dont add config if the name of property is matched to the type of prop
            //for member generic source and desti
            CreateMap<Product, ProductToReturnDTO>()
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name));

        }
    }
}
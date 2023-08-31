using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Inerfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity

    {

        private readonly StoreContext _context;
        public GenericRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<T> getbyIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }


        public async Task<IReadOnlyList<T>> getListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetEntityWithSpecification(ISpecification<T> specs)
        {
            return await ApplySpecification(specs).FirstOrDefaultAsync();
        }
        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> specs)
        {
            return await ApplySpecification(specs).ToListAsync();
        }
        //count
        public async Task<int> GetCount(ISpecification<T> specs)
        {
            return await ApplySpecification(specs).CountAsync();
        }

        // a method to convert iqueryable from the the given spec combining through the evalutor
        private IQueryable<T> ApplySpecification(ISpecification<T> specs)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), specs);
        }

    }
}
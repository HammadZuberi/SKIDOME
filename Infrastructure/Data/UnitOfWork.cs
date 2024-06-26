using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Inerfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        
        //any repository stored inside this 1 -100
        private Hashtable _repositories;

        public UnitOfWork(StoreContext context)
        {
            //new instance of db 
            _context = context;
            
        }
        public async  Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
         _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {

            if(_repositories == null)
            _repositories = new Hashtable();

            var type= typeof(TEntity).Name;
            //if dont have that repo
            if(!_repositories.ContainsKey(type)){

                var repositoryType = typeof(GenericRepository<>);

                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)),_context);

                _repositories.Add(type,repositoryInstance);
            }


            return (IGenericRepository<TEntity>) _repositories[type];
        }
    }
}
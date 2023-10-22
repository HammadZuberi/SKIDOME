using Core.Entities;

namespace Core.Inerfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        //number of changes in DB
        Task<int> Complete();
    }
}
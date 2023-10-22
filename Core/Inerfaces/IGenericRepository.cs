using Core.Entities;
using Core.Specifications;

namespace Core.Inerfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
         
         Task<T> getbyIdAsync(int id);
         Task<IReadOnlyList<T>> getListAllAsync();
         
        Task<T> GetEntityWithSpecification(ISpecification<T> specs);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> specs);


        Task<int> GetCount(ISpecification<T> specs);

        //adding Tracking to the repository to track enity not to save or change in db

        void Add(T enity);
        void Delete(T enity);
        void Update(T enity);
    }
}
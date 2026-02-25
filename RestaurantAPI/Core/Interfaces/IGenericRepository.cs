using Domain.Entities.Base;
using System.Linq.Expressions;

namespace Core.Interfaces;

public interface IGenericRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>, new()
{
    Task<TEntity?> GetByIdAsync(TKey id, bool isDelete = false);
    Task<IReadOnlyList<TEntity>> ListAllAsync();
    Task<IReadOnlyList<TTo>> ListAllAsync<TTo>();
    Task<IReadOnlyList<TEntity>> ListAllAsync(Expression<Func<TEntity, bool>>? predicate = null);
    Task<IReadOnlyList<TTo>> ListAllAsync<TTo>(Expression<Func<TEntity, bool>>? predicate = null);
    Task<IReadOnlyList<TEntity>> ListAsync(ISpecification<TEntity> spec);
    Task AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(TKey id);
    Task<int> SaveChangesAsync();
}

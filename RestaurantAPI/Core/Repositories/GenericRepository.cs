using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Domain;
using Domain.Entities.Base;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Core.Repositories;

public class GenericRepository<TEntity, TKey>(RestaurantDbContext context, IMapper mapper, IImageService imageService) :
    IGenericRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>, new()
{
    public async Task<TEntity?> GetByIdAsync(TKey id, bool isDelete = false)
    {
        var entity = await context.Set<TEntity>().FindAsync(id);

        if (entity == null) return null;

        return entity!.IsDeleted == isDelete ? entity : null;
    }

    public async Task<IReadOnlyList<TEntity>> ListAllAsync()
    {
        return await context.Set<TEntity>()
            .Where(e => !e.IsDeleted)
            .OrderBy(e => e.Id)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<TTo>> ListAllAsync<TTo>()
    {
        return await context.Set<TEntity>()
            .Where(e => !e.IsDeleted)
            .OrderBy(e => e.Id)
            .ProjectTo<TTo>(mapper.ConfigurationProvider)
            .ToListAsync();
    }



    public async Task<IReadOnlyList<TEntity>> ListAsync(ISpecification<TEntity> spec)
    {
        if (spec == null) throw new ArgumentNullException(nameof(spec));

        IQueryable<TEntity> query = spec.Includes.Aggregate(
            context.Set<TEntity>().AsQueryable(),
            (current, include) => current.Include(include));

        if (spec.Criteria != null)
            query = query.Where(spec.Criteria);

        query = query.Where(e => !e.IsDeleted);

        query = query.OrderBy(e => e.Id);

        return await query.ToListAsync();
    }

    public async Task AddAsync(TEntity entity)
    {
        if (entity == null) throw new ArgumentNullException(nameof(entity));

        await context.Set<TEntity>().AddAsync(entity);
    }

    public async Task UpdateAsync(TEntity entity)
    {
        if (entity == null) throw new ArgumentNullException(nameof(entity));

        context.Set<TEntity>().Update(entity);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TKey id)
    {
        var entity = await context.Set<TEntity>().FindAsync(id);
        if (entity == null) return;

        entity.IsDeleted = true;
        await context.SaveChangesAsync();
    }

    public async Task<int> SaveChangesAsync() => await context.SaveChangesAsync();

    protected async Task ReplaceImageAsync(IHasImage entity, IFormFile? newFile)
    {
        if (imageService == null || newFile == null) return;

        if (!string.IsNullOrEmpty(entity.Image))
            await imageService.DeleteImageAsync(entity.Image);

        entity.Image = await imageService.SaveImageAsync(newFile);
    }
}
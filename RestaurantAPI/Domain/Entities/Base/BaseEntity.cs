using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Base;

public abstract class BaseEntity<T> : IEntity<T>
{
    [Key]
    public T Id { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
}

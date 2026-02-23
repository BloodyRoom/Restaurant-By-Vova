namespace Domain.Entities.Base;

public interface IEntity<T>
{
    T Id { get; set; }
    bool IsDeleted { get; set; }
    DateTime DateCreated { get; set; }
}

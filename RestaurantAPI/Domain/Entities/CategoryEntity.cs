using Domain.Entities.Base;
using Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("tblCategories")]
public class CategoryEntity : BaseEntity<long>, IHasImage
{
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? Image { get; set; }
}

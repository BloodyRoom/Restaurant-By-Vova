using Domain.Entities.Base;
using Domain.Entities.Identity;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities;

[Table("Products")]
public class ProductEntity : BaseEntity<long>, IHasImage
{
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;
    public float Price { get; set; }
    public string? Image { get; set; }


    [ForeignKey(nameof(Category))]
    public long CategoryId { get; set; }
    public CategoryEntity Category { get; set; } = null!;
}

using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
/// <summary>
/// Se colaca TaskItem en lugar de Task, porque Task es un clase propia de NetCore
/// </summary>
public class TaskItem
{
    
    public long Id { get; set; }
    [Required]
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public bool Priority { get; set; }
}
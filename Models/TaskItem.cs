using Newtonsoft.Json;
/// <summary>
/// Se colaca TaskItem en lugar de Task, porque Task es un clase propia de NetCore
/// </summary>
public class TaskItem
{
    [JsonProperty("id")]
    public long Id { get; set; }
    [JsonProperty("title")]
    public string Title { get; set; }
    [JsonProperty("description")]
    public string Description { get; set; }
    [JsonProperty("priority")]
    public bool Priority { get; set; }
}
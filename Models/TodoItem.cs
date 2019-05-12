using Newtonsoft.Json;
public class TodoItem
{
    public long Id { get; set; }
    [JsonProperty("title")]
    public string Title { get; set; }
    [JsonProperty("description")]
    public string Description { get; set; }
    [JsonProperty("priority")]
    public bool Priority { get; set; }
}
using System.Collections.Generic;
using System.Linq;
using PowerToys.Plugin.Interfaces;

namespace MyPowerToysRunPlugin
{
    public class Main : IPlugin
    {
        public string Name => "My PowerToys Run Plugin";
        public string Description => "A basic PowerToys Run plugin.";

        public IEnumerable<Result> Query(Query query)
        {
            if (string.IsNullOrWhiteSpace(query.Search))
            {
                return new List<Result>();
            }

            return new List<Result>
            {
                new Result
                {
                    Title = $"You searched for: {query.Search}",
                    SubTitle = "This is a sample result.",
                    IcoPath = "Images\\app.png",
                    Action = e =>
                    {
                        // Action to perform when the result is selected
                        return true;
                    }
                }
            };
        }

        public void Init(PluginInitContext context) { }
    }
}

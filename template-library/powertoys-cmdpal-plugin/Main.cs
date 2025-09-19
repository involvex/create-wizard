using System.Collections.Generic;
using System.Linq;
using PowerToys.Plugin.Interfaces;

namespace MyCmdPalPlugin
{
    public class Main : IPlugin
    {
        public string Name => "My Command Palette Plugin";
        public string Description => "A command-palette style PowerToys Run plugin.";

        private readonly List<Result> _commands = new List<Result>
        {
            new Result { Title = "Run Command One", SubTitle = "Executes the first command", IcoPath = "Images\\app.png", Action = e => true },
            new Result { Title = "Run Command Two", SubTitle = "Executes the second command", IcoPath = "Images\\app.png", Action = e => true },
        };

        public IEnumerable<Result> Query(Query query)
        {
            if (string.IsNullOrWhiteSpace(query.Search))
            {
                return _commands;
            }

            return _commands.Where(c => c.Title.Contains(query.Search, System.StringComparison.OrdinalIgnoreCase));
        }

        public void Init(PluginInitContext context) { }
    }
}
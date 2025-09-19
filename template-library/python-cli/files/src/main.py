import click
from .commands import hello

@click.group()
def cli():
    """A basic Python CLI tool."""
    pass

cli.add_command(hello.hello)

if __name__ == '__main__':
    cli()
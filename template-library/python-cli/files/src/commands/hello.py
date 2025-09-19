import click

@click.command()
@click.option('--name', default='World', help='Who to greet.')
def hello(name):
    """Greets the user."""
    click.echo(f"Hello, {name}!")
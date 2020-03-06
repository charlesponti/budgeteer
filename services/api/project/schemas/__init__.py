import graphene


class Query(graphene.ObjectType):
    hello = graphene.String(name=graphene.String(default_value="World"))
    users = graphene.
    def resolve_hello(self, info, name):
        return f"Hello {name}"

from rest_framework import viewsets
from rest_framework.decorators import action
from .services import PessoaServices
from .serializers import PessoaSerializer

class PessoaViewSet(viewsets.ModelViewSet):
    
    queryset = PessoaServices().get_queryset()
    serializer_class = PessoaSerializer

    def list(self, request):
        return PessoaServices().get_all()

    def retrieve(self, request, pk=None):
        return PessoaServices().get(pk)

    def create(self, request):
        return PessoaServices().create(request.data)

    def update(self, request, pk=None):
       return PessoaServices().update(pk, request.data)

    def destroy(self, request, pk=None):
        return PessoaServices().delete(pk)

    @action(detail=True, methods=['get'])
    def peso_ideal(self, request, pk=None):
        return PessoaServices().peso_ideal(pk)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        return PessoaServices().busca(request.query_params.get('nome'))
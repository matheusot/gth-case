from .serializers import PessoaSerializer
from .models import Pessoa

class PessoaTask:

    def get_queryset(self):
        return Pessoa.objects.all()

    def get_all(self):
        pessoas = Pessoa.objects.all().order_by('-id')
        return PessoaSerializer(pessoas, many=True).data
    
    def get(self, pk):
        pessoa = Pessoa.objects.get(pk=pk)
        return PessoaSerializer(pessoa).data

    def create(self, data):
        serializer = PessoaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return serializer.data, serializer.errors

    def update(self, pk, data):
        pessoa = Pessoa.objects.get(pk=pk)
        serializer = PessoaSerializer(pessoa, data=data)
        if serializer.is_valid():
            serializer.save()
        return serializer.data, serializer.errors

    def delete(self, pk):
        pessoa = Pessoa.objects.get(pk=pk)
        return pessoa.delete()
    
    def busca(self, nome):
        pessoas = Pessoa.objects.filter(nome__icontains=nome)
        return PessoaSerializer(pessoas, many=True).data
    
    def peso_ideal(self, pk):
        pessoa = Pessoa.objects.get(pk=pk)
        return pessoa.calcula_peso_ideal()
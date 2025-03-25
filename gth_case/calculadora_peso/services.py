from .task import PessoaTask
from rest_framework.response import Response
from rest_framework import status

class PessoaServices:

    def get_queryset(self):
        return PessoaTask().get_queryset()

    def get_all(self):
        return Response(PessoaTask().get_all(), status=status.HTTP_200_OK)
    
    def get(self, pk):
        return Response(PessoaTask().get(pk), status=status.HTTP_200_OK)
    
    def create(self, data):
        serializer_data, serializer_errors = PessoaTask().create(data)
        print(serializer_data, serializer_errors)
        if serializer_errors:
            return Response(serializer_errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer_data, status=status.HTTP_201_CREATED)

    def update(self, pk, data):
        serializer_data, serializer_errors = PessoaTask().update(pk, data)
        if serializer_errors:
            return Response(serializer_errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer_data)
    
    def delete(self, pk):
        PessoaTask().delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def busca(self, nome):
        if not nome:
            return Response({'error': 'Nome não informado'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(PessoaTask().busca(nome), status=status.HTTP_200_OK)
    
    def peso_ideal(self, pk):
        peso_ideal = PessoaTask().peso_ideal(pk)
        peso_ideal = round(peso_ideal, 2)
        return Response({'peso_ideal': peso_ideal}, status=status.HTTP_200_OK)
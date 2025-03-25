from rest_framework import serializers
from .models import Pessoa

class PessoaSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(
        max_length=100,
        error_messages={
            'blank': 'O nome não pode estar em branco.',
            'max_length': 'O nome não pode ter mais de 100 caracteres.'
        }
    )
    data_nasc = serializers.DateField(
        required=False,
        allow_null=True,
        error_messages={
            'invalid': 'A data de nascimento deve estar no formato AAAA-MM-DD.'
        }
    )
    cpf = serializers.CharField(
        min_length=11,
        max_length=11,
        required=False,
        allow_blank=False,
        allow_null=True,
        error_messages={
            'max_length': 'O CPF deve ter exatamente 11 caracteres.',
            'min_length': 'O CPF deve ter exatamente 11 caracteres.',
            'blank': 'O CPF não pode estar em branco.'
        }
    )
    sexo = serializers.ChoiceField(
        choices=[('M', 'Masculino'), ('F', 'Feminino')],
        error_messages={
            'invalid_choice': 'O sexo deve ser "M" para Masculino ou "F" para Feminino.'
        }
    )
    altura = serializers.FloatField(
        error_messages={
            'invalid': 'A altura deve ser um número válido.',
            'min_value': 'A altura deve ser um valor positivo.',
            'max_value': 'A altura deve ser um valor menor que 3 metros.'
        }
    )
    peso = serializers.FloatField(
        error_messages={
            'invalid': 'O peso deve ser um número válido.',
            'min_value': 'O peso deve ser um valor positivo.',
            'max_value': 'O peso deve ser um valor menor que 500 quilos.'
        }
    )

    class Meta:
        model = Pessoa
        fields = '__all__'
from django.db import models
from rest_framework.response import Response
from rest_framework import status

class Pessoa(models.Model):
    nome = models.CharField(max_length=100)
    data_nasc = models.DateField(null=True, blank=True)
    cpf = models.CharField(max_length=11, null=True)
    sexo = models.CharField(max_length=1, choices=[('M', 'Masculino'), ('F', 'Feminino')])
    altura = models.FloatField()
    peso = models.FloatField()

    def __str__(self):
        return self.nome

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
    
    def calcula_peso_ideal(self):
        if self.sexo == 'M':
            return (72.7 * self.altura) - 58
        else:
            return (62.1 * self.altura) - 44.7
        
    
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const App = () => {
  const [valor, setValor] = useState('');
  const [saque, setSaque] = useState([]);

  const calcularSaque = () => {
    const valorNumerico = parseInt(valor, 10);
    if (valorNumerico % 10 !== 0) {
      alert('O valor deve ser múltiplo de 10!');
      return;
    }

    const notas = [
      { valor: 50, quantidade: 0 },
      { valor: 20, quantidade: 0 },
      { valor: 10, quantidade: 0 },
    ];

    let valorRestante = valorNumerico;
    notas.forEach((nota) => {
      nota.quantidade = Math.floor(valorRestante / nota.valor);
      valorRestante -= nota.quantidade * nota.valor;
    });

    setSaque(notas.filter((nota) => nota.quantidade > 0));
  };

  return (
    <View style={{ padding: 50 }}>
      <Text>Digite o valor a ser retirado (múltiplo de 10):</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />
      <Button title="Calcular Retirada" onPress={calcularSaque} />

      {saque.length > 0 && (
        <FlatList
          data={saque}
          keyExtractor={(item) => item.valor.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 5 }}>
              <Text>
                R$ {item.valor}: {item.quantidade} nota(s)
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;
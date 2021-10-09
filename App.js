import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import api from "./src/services/api";

function App() {
  const [valor, setValor] = useState("");
  const [result, setResult] = useState("0.00");
  const [data, setData] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    let text = "";
    if (data != null) {
      if (data.BRL_EUR != null) {
        text = (data.BRL_EUR * valor).toFixed(2);
      } else if (data.BRL_USD != null) {
        text = (data.BRL_USD * valor).toFixed(2);
      } else if (data.EUR_BRL != null) {
        text = (data.EUR_BRL * valor).toFixed(2);
      } else if (data.EUR_USD != null) {
        text = (data.EUR_USD * valor).toFixed(2);
      } else if (data.USD_BRL != null) {
        text = (data.USD_BRL * valor).toFixed(2);
      } else if (data.USD_EUR != null) {
        text = (data.USD_EUR * valor).toFixed(2);
      }
    }
    setResult(text);
    Keyboard.dismiss();
  }, [data]);

  async function find() {
    if (fromCurrency == "") {
      alert("[ERRO] Selecione uma moeda!");
      return;
    }

    await api
      .get(
        "convert?q=" +
          `${fromCurrency}` +
          "_" +
          `${toCurrency}` +
          `&compact=ultra&apiKey=4e1fba2c52f2945a3bcf`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert("[ERROR]");
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result}</Text>
      <Text style={styles.valor}>Moeda de Origem:{fromCurrency}</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150, width: "78%" }}
        onValueChange={(itemValue, itemIndex) => setFromCurrency(itemValue)}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="Dólar" value="USD" />
        <Picker.Item label="Real" value="BRL" />
        <Picker.Item label="Euro" value="EUR" />
      </Picker>
      <Text style={styles.valor}>Moeda de Destino:{toCurrency}</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150, width: "78%" }}
        onValueChange={(itemValue, itemIndex) => setToCurrency(itemValue)}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="Dólar" value="USD" />
        <Picker.Item label="Real" value="BRL" />
        <Picker.Item label="Euro" value="EUR" />
      </Picker>

      <TextInput
        onChangeText={(value) => setValor(value)}
        style={styles.input}
        placeholder="Valor para conversão"
        keyboardType="numeric"
      />
      <View style={{ width: "80%" }}>
        <Button
          title="CONVERTER"
          color="darkgreen"
          borderRadius="15"
          onPress={() => {
            find();
          }}
        />
      </View>
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 60,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
  info: {
    width: "80%",
    height: 120,
    borderWidth: 1,
    borderColor: "#222",
    marginTop: 10,
    padding: 5,
  },
  textInfo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  result: {
    width: "100%",
    backgroundColor: "lightgrey",
    color: "green",
    textAlign: "center",
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 36,
    fontWeight: "bold",
  },
  valor: {
    fontWeight: "bold",
  },
});

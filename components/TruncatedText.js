// TruncatedText.js
import React from 'react';
import { Text } from 'react-native';

const capitalizeText = (text) => {
  const words = text.split(' ');
  const excludedWords = ['com', 'de', 'da', 'e', 'em']; // Adicione outras palavras conforme necessário
  const capitalizedWords = words.map((word) => {
    // Verifica se a palavra não está na lista de palavras excluídas
    if (!excludedWords.includes(word.toLowerCase())) {
      // Capitaliza a primeira letra da palavra
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase(); // Mantém a palavra em minúsculas se estiver na lista de exclusões
  });
  return capitalizedWords.join(' ');
};

const TruncatedText = ({ text, maxLength, style }) => {
  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  const capitalizedText = capitalizeText(truncatedText);

  return <Text style={style}>{capitalizedText}</Text>;
};


export default TruncatedText; // Exporte o componente

import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants';
import SortButton from '../components/SortButton';
import ProdutctList from '../components/ProdutctList';
import NoResultsModal from '../components/NoResultsModal';
import { SearchBar } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons"
// import { searchByTitle } from '../services/firebase/product'
import { searchByTitle } from '../services/api/product'

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: 'default', direction: null });
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState(null); // Adicione o estado currentSort
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [noResultsModalVisible, setNoResultsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Adicione um estado para controlar o loading
  const [hasMorePages, setHasMorePages] = useState(true);

  const staticDataSuplementos = [
    { id: 1, name: "Creatina" },
    { id: 2, name: "Whey Protein" },
    { id: 3, name: "Vitaminas" },
    { id: 4, name: "Glutamina" },
    { id: 5, name: "BCAA" },
    { id: 6, name: "Ômega-3" },
    { id: 7, name: "Caseína" },
    { id: 8, name: "Zinco" },
    { id: 10, name: "Colágeno" },
    { id: 11, name: "Prebióticos" },
    { id: 12, name: "Probióticos" },
    { id: 13, name: "Óleo de peixe" },
    { id: 14, name: "L-arginina" },
    { id: 15, name: "L-carnitina" },
    { id: 16, name: "Magnésio" },
    { id: 17, name: "Ferro" },
    { id: 18, name: "Vitamina D" },
    { id: 19, name: "Ginseng" },
    { id: 20, name: "Cálcio" }
  ];

  const sortResultsByDefault = () => {
    setSortOrder({ field: 'default', direction: null });
    if (lastSearchQuery) {
      executeSearch(lastSearchQuery, 0, true, null);
    }
  };

  const sortResultsByRelevance = () => {
    setSortOrder({ field: 'relevance', direction: 'asc' });
    if (lastSearchQuery) {
      executeSearch(lastSearchQuery, 0, true, 'preco_qnt_asc');
    }
  };

  const sortResultsByPrice = () => {
    let newResults = searchResults;

    if (!sortOrder.direction) {
      newResults = cleanSearchResultsByScoreDifference(searchResults);
    }

    const orderBy = sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ field: 'price', direction: orderBy });

    const sortedResults = newResults.sort((a, b) =>
      orderBy === 'asc' ? a.preco_numeric - b.preco_numeric : b.preco_numeric - a.preco_numeric
    );

    setSearchResults(sortedResults);

    if (null) {
      if (lastSearchQuery) {
        executeSearch(lastSearchQuery, 0, true, orderBy);
      }
    }
  };

  const cleanSearchResultsByScoreDifference = (searchResults) => {
    if (searchResults.length === 0) {
      return [];
    }

    const thresholdScore = searchResults[0].score * 0.7; // 30% menor que o maior score
    let thresholdScoreIndex = searchResults.length;
    let largestDifferenceIndex = searchResults.length;
    let largestScoreDifference = 0;

    // Encontrando o índice baseado na maior diferença de score
    for (let i = 0; i < searchResults.length - 1; i++) {
      let currentDifference = searchResults[i].score - searchResults[i + 1].score;
      if (currentDifference > largestScoreDifference) {
        largestScoreDifference = currentDifference;
        largestDifferenceIndex = i + 1;
      }
    }

    // Encontrando o índice baseado no limite de score
    for (let i = 0; i < searchResults.length; i++) {
      if (searchResults[i].score < thresholdScore) {
        thresholdScoreIndex = i;
        break;
      }
    }

    // Usando o maior índice entre os dois métodos de corte
    const cutOffIndex = Math.max(thresholdScoreIndex, largestDifferenceIndex);

    const cleanedResults = searchResults.slice(0, cutOffIndex);
    return cleanedResults;
  };

  const executeSearch = async (query, page = 0, reset = true, currentSort = null) => {
    if (!query.trim()) {
      setCurrentPage(0);
      setSearchResults([]); // Defina a pesquisa como vazia quando não houver consulta
      return [];
    }

    setIsLoading(true);
    try {
      if (searchResults.length > 0) {
        setPageSize(8)
      }

      const data = await searchByTitle(query, page, pageSize, null);
      const products = data.results
      const totalPages = data.totalPages

      if (reset) {
        setSearchResults(products);
      } else {
        setSearchResults(prevResults => {
          // Crie um conjunto (set) dos IDs dos produtos existentes
          const existingProductIds = new Set(prevResults.map(product => product.ref));

          // Filtrar os produtos para remover os que já estão na lista
          const newProducts = products.filter(product => !existingProductIds.has(product.ref));

          // Adicionar os produtos filtrados à lista existente
          return [...prevResults, ...newProducts];
        });
      }

      setLastSearchQuery(query);
      setCurrentPage(page);
      setIsLoading(false);

      if (page >= totalPages - 1) {
        setHasMorePages(false);
      }

      return products;
    } catch (error) {
      console.error('(executeSearch) - Erro ao buscar produtos:', error);
      setSearchResults([]);
      return []; // Retorne um array vazio em caso de erro
    }
  };

  const handleCategoryItemClick = async (categoryName) => {
    setSearchText(categoryName); // Define a palavra-chave no campo de busca

    try {
      const products = await executeSearch(categoryName, 0, true, null);

      if (products.length === 0) {
        setNoResultsModalVisible(true); // Mostrar o modal se não houver resultados
      } else {
        setSearchResults(products);
        setLastSearchQuery(categoryName);
      }

    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setSearchResults([]);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setSearchResults([]);
      setCurrentPage(0);
      setSortOrder({ field: 'default', direction: null });
      return;
    }

    try {
      const performSearch = async () => {
        setSortOrder({ field: 'default', direction: null });

        setTimeout(async () => {
          const products = await executeSearch(searchText, 0);

          if (products.length === 0) {
            setNoResultsModalVisible(true); // Mostrar o modal se não houver resultados
          } else {
            setSearchResults(products);
            setLastSearchQuery(searchText);
          }
        }, 0);
      };

      await performSearch();
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setSearchResults([]);
    }
  };

  const handleLoadMore = () => {
    console.log(hasMorePages)
    if (hasMorePages) {
      const nextPage = currentPage + 1;
      executeSearch(lastSearchQuery, nextPage, false, currentSort); // Passar o valor de currentSort
    }
  };

  const clearSearchAndHandleSearch = () => {
    setSearchText('');
  };

  useEffect(() => {
    if (searchText === '') {
      handleSearch();
    }
  }, [searchText]);

  const renderCategoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 0.3,
          borderColor: COLORS.grey_title_low
        }}
        onPress={() => handleCategoryItemClick(item.name)}
      >
        <View>
          <View>
            <Text
              style={{
                fontSize: 22,
                color: COLORS.grey_title_mid,
                fontFamily: 'eurostile',
                margin: 20,
                letterSpacing: 3,
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginHorizontal: 22,
            marginTop: 12,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "5%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={32}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginLeft: "15%",
                alignItems: "center",
                justifyContent: "center",

              }}
            >
              <Text
                style={{
                  fontFamily: "eurostile",
                  fontSize: 20,
                  letterSpacing: 2,
                }}
              >
                Suplementos
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "20%",
              }}
            >
              <TouchableOpacity
                onPress={clearSearchAndHandleSearch}
              >
                <Text
                  style={{
                    fontFamily: "eurostile",
                    color: 'black',
                    fontSize: 18,
                  }}
                >
                  Limpar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <SearchBar
              placeholder="Buscar em toda a NutriFind..."
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
              lightTheme
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
              }}
              inputContainerStyle={{
                backgroundColor: 'rgba(237, 237, 237, 0.5)',
                borderRadius: 8,
              }}
              inputStyle={{
                color: 'rgba(0, 0, 0, 0.7)',
              }}
              onSubmitEditing={handleSearch}
              searchIcon={{
                size: 24,
                containerStyle: { marginRight: 10 },
              }}
            />
          </View>
          {searchResults.length == 0 ? (
            <View
              style={{
                marginTop: 30,
                height: "83%"
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "eurostile",
                  color: COLORS.black,
                  letterSpacing: 4,
                }}
              >
                Buscar por...
              </Text>
              <FlatList
                style={{ marginTop: 18 }}
                data={staticDataSuplementos}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          ) : (
            <View style={{ marginTop: 0 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 0.3,
                  borderBottomColor: COLORS.grey_title_low,
                  paddingVertical: 10,
                }}
              >
                <SortButton
                  label="Todos"
                  isActive={sortOrder.field === 'default'}
                  onPress={sortResultsByDefault}
                  sortOrder={sortOrder.direction}
                />
                {/* <SortButton
                  label="Relevância"
                  isActive={sortOrder.field === 'relevance'}
                  onPress={sortResultsByRelevance}
                  sortOrder={sortOrder.direction}
                /> */}
                <SortButton
                  label="Preço"
                  isActive={sortOrder.field === 'price'}
                  onPress={sortResultsByPrice}
                  iconActive={true}
                  sortOrder={sortOrder.direction}
                />
              </View>
              <ProdutctList
                data={searchResults}
                numColumns={2}
                handleLoadMore={handleLoadMore}
                navigation={navigation} // Adicione esta linha para passar a função de navegação
              />
            </View>
          )}
        </View>
      </View>

      <NoResultsModal
        visible={noResultsModalVisible}
        onClose={() => setNoResultsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Search;
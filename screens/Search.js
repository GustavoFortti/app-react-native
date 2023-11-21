import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { COLORS,
         FONTS,
         staticDataCategoria,
         staticDataSabor,
         staticDataOrdem } from '../constants';
import FilterButton from '../components/FilterButton';
import CategoryItem from '../components/CategoryItem';
import ButtonSearch from '../components/ButtonSearch';
import { SearchBar, Icon } from 'react-native-elements';
import ProdutctList from '../components/ProdutctList';
import { searchByTitle } from '../services/api/product';
import { MaterialIcons } from "@expo/vector-icons"
import Loading from '../components/Loading';

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [pageSize, setPageSize] = useState(30);
  const [hasMorePages, setHasMorePages] = useState(true);

  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [noResultsModalVisible, setNoResultsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Adicione um estado para controlar o loading

  const [containerOption, setContainerOption] = useState('categoria');
  const [selectedItemCategoria, setSelectedItemCategoria] = useState('');
  const [selectedItemSabor, setSelectedItemSabor] = useState('');
  const [selectedItemOrdem, setSelectedItemOrdem] = useState('');

  useEffect(() => {
    setSearchText(selectedItemCategoria + ' ' + selectedItemSabor);
  }, [selectedItemCategoria, selectedItemSabor]);

  useEffect(() => {
    if (searchText === '') {
      setSelectedItemCategoria('')
      setSelectedItemSabor('')
    }
  }, [searchText]);

  const clearResults = () => {
    setSelectedItemCategoria('')
    setSelectedItemSabor('')
    setSelectedItemOrdem('')
  }

  const showCategoria = () => {
    setContainerOption("categoria")
  }

  const showSabor = () => {
    setContainerOption("sabor")
  }

  const showOrdem = () => {
    setContainerOption("ordem")
  }

  const renderCategoryItem = ({ item, index }, tipoFiltro) => {
    return (
      <CategoryItem
        item={item}
        onPress={() => {
          handleCategoryItemClick(item.name, tipoFiltro);
        }}
        isSelected={
          (tipoFiltro === 'categoria' && selectedItemCategoria === item.name) ||
          (tipoFiltro === 'sabor' && selectedItemSabor === item.name) ||
          (tipoFiltro === 'ordem' && selectedItemOrdem === item.name)
        }
      />
    );
  };

  const handleCategoryItemClick = async (categoryName, tipoFiltro) => {
    if (tipoFiltro === 'categoria') {
      if (categoryName === selectedItemCategoria) {
        setSelectedItemCategoria('')
      } else {
        setSelectedItemCategoria(categoryName);
      }
    } else if (tipoFiltro === 'sabor') {
      if (categoryName === selectedItemSabor) {
        setSelectedItemSabor('')
      } else {
        setSelectedItemSabor(categoryName);
      }
    } else if (tipoFiltro === 'ordem') {
      if (categoryName === selectedItemOrdem) {
        setSelectedItemOrdem('')
      } else {
        setSelectedItemOrdem(categoryName);
      }
    }

  };

  const handleSearch = async () => {
    setContainerOption('')
    setSearchResults([]);
    if (!searchText.trim()) {
      setCurrentPage(0);
      return;
    }

    try {
      const performSearch = async () => {

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
      setContainerOption('noresults')
      setSearchResults([]);
    }
  };

  const handleLoadMore = () => {
    if (hasMorePages) {
      const nextPage = currentPage + 1;
      executeSearch(lastSearchQuery, nextPage, false); // Passar o valor de currentSort
    }
  };

  const executeSearch = async (query, page = 0, reset = true) => {
    if (!query.trim()) {
      setCurrentPage(0);
      setSearchResults([]);
      return [];
    }
    
    setIsLoading(true);
    try {
      if (searchResults.length > 0) {
        setPageSize(20)
      }

      let orderParam = null
      const order = staticDataOrdem.find((data) => data.name === selectedItemOrdem)
      if (order) {
        orderParam = {'field': order.field, "direction": order.direction}
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
      setContainerOption('noresults')
      return []; // Retorne um array vazio em caso de erro
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginHorizontal: 22,
            marginTop: 25,
            alignItems: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 35,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={36}
                  color={COLORS.grey_3}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: "-8%",
                  fontSize: 18,
                  fontWeight: '400',
                  fontFamily: 'eurostile',
                }}
              >
                Suplementos
              </Text>
              <Text></Text>
            </View>
            <SearchBar
              placeholder="Buscar por suplementos..."
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
              lightTheme
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.grey_0,
                width: "100%",
                borderRadius: 8,
                marginBottom: 14,
              }}
              inputStyle={{
                color: 'rgba(0, 0, 0, 0.7)',
              }}
              onSubmitEditing={handleSearch}
              searchIcon={{
                size: 24,
                containerStyle: { marginRight: 5, marginLeft: 10 },
              }}
              clearIcon={{
                size: 22,
                onPress: clearResults,
              }}
            />
            <View
              style={{
                width: "100%",
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  marginHorizontal: 7,
                  flexDirection: "row",
                  alignContent: "center"
                }}>
                <FilterButton
                  label="Categorias"
                  isActive={containerOption === 'categoria'}
                  onPress={showCategoria}
                  noActive={containerOption === ''}
                />
                <FilterButton
                  label="Sabores"
                  isActive={containerOption === 'sabor'}
                  onPress={showSabor}
                  noActive={containerOption === ''}
                />
                <FilterButton
                  label="Ordenar"
                  isActive={containerOption === 'ordem'}
                  onPress={showOrdem}
                  noActive={containerOption === ''}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 0,
              width: "100%",
              height: "83%",
              alignItems: "center",
            }}>
            {containerOption === 'categoria' ? (
              <FlatList
                style={{ marginTop: 18, height: '50%' }}
                data={staticDataCategoria}
                renderItem={({ item, index }) => renderCategoryItem({ item, index }, "categoria")}
                keyExtractor={(item) => item.id.toString()}
                scrollIndicatorInsets={{ right: 1, backgroundColor: COLORS.grey_0 }}
              />
            ) : containerOption === 'sabor' ? (
              <FlatList
                style={{ marginTop: 18, height: '50%' }}
                data={staticDataSabor}
                renderItem={({ item, index }) => renderCategoryItem({ item, index }, "sabor")}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : containerOption === 'ordem' ? (
              <FlatList
                style={{ marginTop: 18, height: '50%' }}
                data={staticDataOrdem}
                renderItem={({ item, index }) => renderCategoryItem({ item, index }, "ordem")}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : containerOption === 'noresults' ? (
              <View style={{ marginTop: '50%' }}>
                <Text style={FONTS.title}>
                  Sem resultados...
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: '110%',
                  height: "95%",
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isLoading ? (
                  <View
                    style={{
                      flex: 1,
                      position: 'absolute',
                      zIndex: 1,
                      top: "30%",
                      left: "45%",
                      right: "50%",
                      bottom: "50%",
                      height: "10%",
                      width: "10%",
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Loading isActive={isLoading} />
                  </View>
                ) : (null)}
                <ProdutctList
                  data={searchResults}
                  numColumns={2}
                  handleLoadMore={handleLoadMore}
                  navigation={navigation}
                  isLoading={isLoading}
                />
              </View>
            )}
            {containerOption !== '' ? (<ButtonSearch onPress={handleSearch} />) : (null)}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
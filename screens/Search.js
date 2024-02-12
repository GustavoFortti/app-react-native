import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons"

import {
  COLORS,
  staticDataCategoria,
  staticDataOrdem
} from '../constants';

import { searchByTitle } from '../services/api/products';

import CustomDropdown from '../components/CustomDropdown';
import FilterButton from '../components/FilterButton';
import CategoryItem from '../components/CategoryItem';
import NoResultsModal from '../components/NoResultsModal';
import ProdutctList from '../components/ProdutctList';
import Loading from '../components/Loading';

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [pageSize, setPageSize] = useState(30);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [hasMorePagesModal, setHasMorePagesModal] = useState(false);

  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [noResultsModalVisible, setNoResultsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [containerOption, setContainerOption] = useState('categoria');
  const [selectedItemCategoria, setSelectedItemCategoria] = useState('');
  const [selectedItemSabor, setSelectedItemSabor] = useState('');
  const [selectedItemOrdem, setSelectedItemOrdem] = useState('');
  const [selectedItemOrdemMaxQnt, setSelectedItemOrdemMaxQnt] = useState(null);
  const [selectedItemOrdemMinQnt, setSelectedItemOrdemMinQnt] = useState(null);

  useEffect(() => {
    setSearchText(selectedItemCategoria + ' ' + selectedItemSabor);
  }, [selectedItemCategoria, selectedItemSabor]);

  useEffect(() => {
    setSelectedItemSabor('')
    setSelectedItemOrdem('')
    setSelectedItemOrdemMaxQnt(null)
    setSelectedItemOrdemMinQnt(null)
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
        setSelectedItemOrdemMaxQnt={setSelectedItemOrdemMaxQnt}
        selectedItemOrdemMaxQnt={selectedItemOrdemMaxQnt}
        setSelectedItemOrdemMinQnt={setSelectedItemOrdemMinQnt}
        selectedItemOrdemMinQnt={selectedItemOrdemMinQnt}
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
    if (!searchText.trim()) {
      setCurrentPage(0);
      return;
    }

    setContainerOption('')
    setSearchResults([]);

    try {
      const performSearch = async () => {
        setTimeout(async () => {
          const products = await executeSearch(searchText, 0);
          if (products.length === 0) {
            setNoResultsModalVisible(true); // Mostrar o modal se não houver resultados
            setContainerOption("categoria")
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
    if (hasMorePages) {
      const nextPage = currentPage + 1;
      executeSearch(lastSearchQuery, nextPage, false); // Passar o valor de currentSort
    } else {
      setHasMorePagesModal(true)
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
      const ordem = selectedItemOrdem !== '' ? staticDataOrdem.find((data) => data.name === selectedItemOrdem) : null;
      const sort = ordem ? { 'by': ordem.field, "ascending": ordem.direction } : null
      
      let filter = null;


      if (selectedItemOrdemMinQnt || selectedItemOrdemMaxQnt) {
        filter = { quantity: {} };
        
        if (selectedItemOrdemMinQnt) {
          filter.quantity.gte = selectedItemOrdemMinQnt;
        }
        
        if (selectedItemOrdemMaxQnt) {
          filter.quantity.lt = selectedItemOrdemMaxQnt;
        }
      }
      
      const data = await searchByTitle(query, "ef1ef5aa", page, pageSize, sort, filter);
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

      if (page === 0) {
        setHasMorePages(true);
      }
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
                  label="Ordenar"
                  isActive={containerOption === 'ordem'}
                  onPress={showOrdem}
                  noActive={containerOption === ''}
                  filterSelected={selectedItemOrdem || selectedItemOrdemMaxQnt > 1 || selectedItemOrdemMinQnt > 1}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 30,
              width: "100%",
              height: "75%",
              alignItems: "center",
            }}>
            {containerOption === 'categoria' ? (
              <CustomDropdown
                containerOption={'categoria'}
                onPressArrowUp={setContainerOption}
                searchResults={searchResults}
                staticData={staticDataCategoria}
                renderCategoryItem={renderCategoryItem}
                handleSearch={handleSearch}
              />
            ) : containerOption === 'ordem' ? (
              <CustomDropdown
                containerOption={'ordem'}
                onPressArrowUp={setContainerOption}
                searchResults={searchResults}
                staticData={staticDataOrdem}
                renderCategoryItem={renderCategoryItem}
                handleSearch={handleSearch}
              />

            ) : (
              <View
                style={{
                  width: '110%',
                  height: "96%",
                  alignItems: 'center',
                  justifyContent: 'center',
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
          </View>
        </View>
      </View>
      {noResultsModalVisible ? (
        <NoResultsModal
          visible={noResultsModalVisible}
          onClose={() => setNoResultsModalVisible(false)}
          label="Nenhum resultado encontrado."
        />
      ) : (null)}
      {hasMorePagesModal ? (
        <NoResultsModal
          visible={true}
          onClose={() => setHasMorePagesModal(false)}
          label="Sem mais resultados."
        />
      ) : (null)}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  flatList: {
    marginTop: 18,
    height: '60%',
    width: "100%",
  },
});

export default Search;
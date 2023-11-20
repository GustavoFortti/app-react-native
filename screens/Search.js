import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, staticDataCategoria, staticDataSabor, staticDataOrdem } from '../constants';
import FilterButton from '../components/FilterButton';
import CategoryItem from '../components/CategoryItem';
import ButtonSearch from '../components/ButtonSearch';
import { SearchBar, Icon } from 'react-native-elements';
import ProdutctList from '../components/ProdutctList';
import { searchByTitle } from '../services/api/product';


const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [containerOption, setContainerOption] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState(null); // Adicione o estado currentSort
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [noResultsModalVisible, setNoResultsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Adicione um estado para controlar o loading
  const [hasMorePages, setHasMorePages] = useState(true);
  
  const [showHome, setShowHome] = useState(true);
  const [showFilter, setShowFilter] = useState(false)
  
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

  useEffect(() => {
    if (searchResults.length === 0 && showFilter === false) {
      setShowHome(true)
    }
  }, [searchResults, showFilter]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowHome(false)
    }
  }, [searchResults]);

  const clearResults = () => {
    setSearchResults([])
    setShowFilter(false)
    setShowHome(true)
  }

  const showCategoria = () => {
    setContainerOption("categoria")
    setShowFilter(true)
    setShowHome(false)
  }

  const showSabor = () => {
    setContainerOption("sabor")
  }

  const showOrdem = () => {
    setContainerOption("ordem")
  }

  const cleanContainerOption = () => {
    setShowFilter(false)
    setContainerOption('')
    // setShowHome(true)
    // setSelectedItemCategoria('')
    // setSelectedItemSabor('')
    // setSelectedItemOrdem('')
    // setSearchText('')
  }

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
      setContainerOption('noresults')
      return []; // Retorne um array vazio em caso de erro
    }
  };

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
    return

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
    setShowFilter(false)
    if (!searchText.trim()) {
      setSearchResults([]);
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
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
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
            {(!showHome & showFilter) ? (
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
                  />
                  <FilterButton
                    label="Sabores"
                    isActive={containerOption === 'sabor'}
                    onPress={showSabor}
                  />
                  <FilterButton
                    label="Ordenar por"
                    isActive={containerOption === 'ordem'}
                    onPress={showOrdem}
                  />
                </View>
                <TouchableOpacity
                  onPress={cleanContainerOption}
                  style={{
                    transform: [{ scaleY: -1 }],
                    marginTop: 20,
                    width: 60,
                    height: 40,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="filter-list"
                    size={26}
                    color={COLORS.grey_3}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={showCategoria}
                style={{
                  padding: 5,
                  width: 60,
                  height: 40,
                }}>
                <Icon
                  name="filter-list"
                  size={26}
                  color={COLORS.grey_3}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              marginTop: 0,
              width: "100%",
              height: "83%",
              alignItems: "center",
            }}>
            { showHome & !showFilter & searchResults.length === 0 ? (
              <View style={{ marginTop: '50%' }}>
                <Text style={FONTS.largeTitle}>
                  Nutrifind
                </Text>
              </View>
            ) : showFilter & containerOption === 'categoria' ? (
              <FlatList
                style={{ marginTop: 18, height: '50%' }}
                data={staticDataCategoria}
                renderItem={({ item, index }) => renderCategoryItem({ item, index }, "categoria")}
                keyExtractor={(item) => item.id.toString()}
                scrollIndicatorInsets={{ right: 1, backgroundColor: COLORS.grey_0 }}
              />
            ) : showFilter & containerOption === 'sabor' ? (
              <FlatList
                style={{ marginTop: 18, height: '50%' }}
                data={staticDataSabor}
                renderItem={({ item, index }) => renderCategoryItem({ item, index }, "sabor")}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : showFilter & containerOption === 'ordem' ? (
              <FlatList
                style={{ marginTop: 18, height: '50%' }}
                data={staticDataOrdem}
                renderItem={({ item, index }) => renderCategoryItem({ item, index }, "ordem")}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : showFilter & containerOption === 'noresults' ? (
              <View style={{ marginTop: '50%' }}>
                <Text style={FONTS.title}>
                  Sem resultados...
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: '110%',
                  height: "100%",
                }}
              >
                <ProdutctList
                  data={searchResults}
                  numColumns={2}
                  handleLoadMore={handleLoadMore}
                  navigation={navigation} // Adicione esta linha para passar a função de navegação
                />
              </View>
            )}
            {showFilter ? (<ButtonSearch onPress={handleSearch} />) : (null)}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
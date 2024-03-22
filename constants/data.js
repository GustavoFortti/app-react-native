export const staticDataCategoria = [
  { id: 1, name: "Creatina" },
  { id: 9, name: "Pré-treino" },
  { id: 2, name: "Whey Protein" },
  { id: 4, name: "Barrinhas" },
  { id: 3, name: "Hipercalorico" },
  { id: 13, name: "Cafeina" },
  { id: 7, name: "Vitamina C"},
  { id: 10, name: "Vitamina D" },
  { id: 6, name: "Ômega-3" },
  { id: 5, name: "BCAA" },
  { id: 8, name: "Colágeno" },
  { id: 11, name: "Glutamina" },
  { id: 12, name: "Albumina" },
];

export const staticDataSabor = [
  { id: 1, name: "Chocolate" },
  { id: 2, name: "Chocolate Branco" },
  { id: 3, name: "Cream" },
  { id: 4, name: "Cookie" },
];

export const staticDataOrdem = [
  { id: 1, name: "Menor preço", field: "price_numeric", direction: "asc"},
  { id: 2, name: "Maior preço", field: "price_numeric", direction: "desc"},
  { id: 3, name: "Menor quantidade", field: "quantity", direction: "asc"},
  { id: 4, name: "Maior quantidade", field: "quantity", direction: "desc"},
  { id: 5, name: "Preço x quantidade", field: "price_qnt", direction: "asc"},
  { id: 6, name: "Quantidade", field: "quantidade_filter"},
  { id: 7, name: "De:", field: "min_qnt"},
  { id: 8, name: "Até:", field: "max_qnt"},
  { id: 9, name: "", field: ""},
];

const appData = { staticDataCategoria, staticDataSabor, staticDataOrdem }

export default appData
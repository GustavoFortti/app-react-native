import images from "./images";

export const staticDataCategoria = [
  { id: 1, name: "peruana" },
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

export const staticDataSabor = [
  { id: 1, name: "Chocolate" },
  { id: 2, name: "Chocolate Branco" },
  { id: 3, name: "Cream" },
  { id: 4, name: "Cookie" },
];

export const staticDataOrdem = [
  { id: 1, name: "Quantidade menor", field: "qtd", direction: "asc"},
  { id: 2, name: "Quantidade maior", field: "qtd", direction: "desc"},
  { id: 3, name: "Preço menor", field: "preco_numeric", direction: "asc"},
  { id: 4, name: "Preço maior", field: "preco_numeric", direction: "desc"},
  { id: 5, name: "Preço x quantidade", field: "preco_qtd", direction: "asc"},
];

const appData = { staticDataCategoria, staticDataSabor, staticDataOrdem }

export default appData
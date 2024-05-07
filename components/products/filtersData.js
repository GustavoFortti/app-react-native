const sort = [
  { field: null, order: null, label: 'Normal', value: '0' },
  { field: "price_numeric", order: "asc", label: 'Menor preço', value: '1' },
  { field: "price_numeric", order: "desc", label: 'Maior preço', value: '2' },
  { field: "quantity", order: "asc", label: 'Menor quantidade', value: '3' },
  { field: "quantity", order: "desc", label: 'Maior quantidade', value: '4' },
  { field: "price_qnt", order: "desc", label: 'Preço por quantidade', value: '5' },
  { field: "price_discount_percent", order: "desc", label: 'Maior desconto', value: '6' },
];

const brand = [
  { name: "Adaptogen", label: "Adaptogen", value: '1' },
  { name: "Atlhetica Nutrition", label: "Atlhetica Nutrition", value: '2' },
  { name: "Black Skull", label: "Black Skull", value: '3' },
  { name: "Boldsnacks", label: "Boldsnacks", value: '4' },
  { name: "Dark Lab", label: "Dark Lab", value: '5' },
  { name: "Darkness", label: "Darkness", value: '6' },
  { name: "Dux", label: "Dux", value: '7' },
  { name: "Growth ", label: "Growth ", value: '8' },
  { name: "Integralmedica", label: "Integralmedica", value: '9' },
  { name: "Iridium Labs", label: "Iridium Labs", value: '10' },
  { name: "Max Titanium", label: "Max Titanium", value: '11' },
  { name: "New Millen", label: "New Millen", value: '12' },
  { name: "Nutrata", label: "Nutrata", value: '13' },
  { name: "Probiotica", label: "Probiotica", value: '14' },
  { name: "Puravida", label: "Puravida", value: '15' },
  { name: "Truesource", label: "Truesource", value: '16' },
  { name: "Under Labz", label: "Under Labz", value: '17' },
  { name: "Vitafor", label: "Vitafor", value: '18' },
];

const rangePrice = {
  min: 0,
  max: 1000
}

const rangeQnt = {
  min: 0,
  max: 5000
}

const filterData = {
  sort,
  brand,
  rangePrice,
  rangeQnt
}

export default filterData;
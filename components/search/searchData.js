import { COLORS } from '../../constants';

export const promotion = [
  { id: 1, search: "% Promoções", index: "", imageUrl: "" },
];

export const muscle_mass = [
  { id: 1, search: "Creatina", index: "", imageUrl: "https://s2-oglobo.glbimg.com/-E9Woz-cKLTGB94xgFKMmkvtbpI=/0x0:1100x745/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/w/K/JGZj1xSGyn4gAAfbT84A/arte-47-.png" },
  { id: 2, search: "Proteinas", index: "", imageUrl: "https://file.hstatic.net/200000623631/file/cac-loai-whey-1_cdbb2b4413ef4adcb79c65cb1fe7dc0b.jpeg" },
  { id: 3, search: "Hipercalorico", index: "", imageUrl: "https://s2-oglobo.glbimg.com/-E9Woz-cKLTGB94xgFKMmkvtbpI=/0x0:1100x745/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/w/K/JGZj1xSGyn4gAAfbT84A/arte-47-.png" },
  { id: 4, search: "Carboidratos", index: "", imageUrl: "https://s2-oglobo.glbimg.com/-E9Woz-cKLTGB94xgFKMmkvtbpI=/0x0:1100x745/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/w/K/JGZj1xSGyn4gAAfbT84A/arte-47-.png" },
];

export const protein_bar = [
  { id: 1, search: "Barrinhas de proteina", index: "", imageUrl: "https://file.hstatic.net/200000623631/file/cac-loai-whey-1_cdbb2b4413ef4adcb79c65cb1fe7dc0b.jpeg" },
];

export const whey = [
  { id: 1, search: "Whey Protein", index: "", imageUrl: "https://file.hstatic.net/200000623631/file/cac-loai-whey-1_cdbb2b4413ef4adcb79c65cb1fe7dc0b.jpeg" },
];

export const peanut_butter = [
  { id: 1, search: "Pasta de amendoim", index: "", imageUrl: "https://file.hstatic.net/200000623631/file/cac-loai-whey-1_cdbb2b4413ef4adcb79c65cb1fe7dc0b.jpeg" },
];

export const energy_and_focus = [
  { id: 1, search: "Pré-Treino", index: "", imageUrl: "https://file.hstatic.net/200000623631/file/cac-loai-whey-1_cdbb2b4413ef4adcb79c65cb1fe7dc0b.jpeg" },
  { id: 2, search: "Cafeina", index: "", imageUrl: "https://www.tucanaldesalud.es/es/canalciencia/articulos/efectos-cafeina-salud.ficheros/1939045-cafeina-salud.jpg?width=400&height=350&aspectRatio=true" },
  { id: 3, search: "Vitaminas, minerais & nutrientes", index: "", imageUrl: "https://t42748.vteximg.com.br/arquivos/ids/190856-1920-1280/composicao-quimica-de-vitaminas-e-carboidratos.jpg?v=638101000929930000" },
];

export const weight_loss = [
  { id: 1, search: "Termogenico", index: "", imageUrl: "" },
  { id: 2, search: "Oleos", index: "", imageUrl: "" },
  { id: 3, search: "Temperos", index: "", imageUrl: "" },
  { id: 4, search: "Adoçantes", index: "", imageUrl: "" },
];

export const amino_acid = [
  { id: 1, search: "Energia", index: "", imageUrl: "" },
  { id: 1, search: "Perfomance", index: "", imageUrl: "" },
  { id: 1, search: "Imunidade", index: "", imageUrl: "" },
];

export const health = [
  { id: 1, search: "pele", index: "", imageUrl: "" },
  { id: 2, search: "vitaminas", index: "", imageUrl: "" },
  { id: 3, search: "nutrientes", index: "", imageUrl: "" },
  { id: 4, search: "cabelo", index: "", imageUrl: "" },
  { id: 5, search: "omega 3", index: "", imageUrl: "" },
  { id: 6, search: "colageno", index: "", imageUrl: "" },
];

export const combos = [
  { id: 1, search: "Pasta de amendoim", index: "", imageUrl: "" },
];

// Style
export const BannerButtonStyleWhite = {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: COLORS.white,
  borderColor: COLORS.grey_6,
  borderWidth: 0.5,
  borderRadius: 3,
  height: 50,
  width: "100%",
  marginTop: 30,
};

export const BannerButtonStyleGradient = {
  height: 50,
  width: "100%",
  marginTop: 10,
};

export const ImgSmallButtonStyle = {
  backgroundColor: COLORS.white,
  marginTop: 20,
  height: 140,
  width: 210,
  borderRadius: 5,
  marginRight: 12,
};

export const ImgBigButtonStyle = {
  backgroundColor: COLORS.white,
  marginTop: 20,
  height: 120,
  width: "100%",
  borderRadius: 5,
};

export const buttonStyles = {
  ImgSmallButtonStyle,
  BannerButtonStyleWhite,
  ImgBigButtonStyle,
  BannerButtonStyleGradient
};

const buttonData = {
  whey,
  promotion,
  muscle_mass,
  protein_bar,
  peanut_butter,
  energy_and_focus,
  weight_loss,
  amino_acid,
  health,
  combos
}

export default buttonData;
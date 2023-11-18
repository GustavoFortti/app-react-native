import database from './firebase'
import { collection, query, where, getDocs, orderBy, getFirestore, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const searchByType = async (tipoProduto, page, pageSize, sort = null) => {
  try {
    const produtosCollection = collection(database, 'produtos');

    tipoProduto = tipoProduto.toLowerCase()
    const sortCriteria = {
      null: 'tipo',
      'preco_asc': ['preco', 'asc'],
      'preco_desc': ['preco', 'desc'],
      'preco_qnt_asc': ['preco_qnt', 'asc'],
    };

    const sortCriterion = sortCriteria[sort] || sortCriteria.null;
    let q = null
    
    if (sort == null) {
      q = query(
        produtosCollection,
        where('tipo', '==', tipoProduto)
      );
    } else {
      q = query(
        produtosCollection,
        orderBy(...sortCriterion),
        where('tipo', '==', tipoProduto)
      );
    }

    const startAt = (page - 1) * pageSize;
    const limit = pageSize;

    const querySnapshot = await getDocs(q);

    const results = [];

    const paginatedQuerySnapshot = querySnapshot.docs.slice(startAt, startAt + limit);

    paginatedQuerySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    return results;
  } catch (error) {
    console.error('(searchByType) - Erro ao consultar a coleção "produtos":', error);
    throw error;
  }
};

const searchByTitle = async (tituloProduto, page, pageSize, sort = null) => {
  try {
    const produtosCollection = collection(database, 'produtos');

    tituloProduto = tituloProduto.toLowerCase();
    const sortCriteria = {
      null: 'tipo',
      'preco_asc': ['preco', 'asc'],
      'preco_desc': ['preco', 'desc'],
      'preco_qnt_asc': ['preco_qnt', 'asc'],
    };

    const sortCriterion = sortCriteria[sort] || sortCriteria.null;
    let q = null;

    if (sort == null) {
      q = query(
        produtosCollection,
        where('titulo', 'in', [tituloProduto])
      );
    } else {
      q = query(
        produtosCollection,
        orderBy(...sortCriterion),
        where('titulo', 'in', [tituloProduto])
      );
    }

    const startAt = (page - 1) * pageSize;
    const limit = pageSize;

    const querySnapshot = await getDocs(q);

    const results = [];

    const paginatedQuerySnapshot = querySnapshot.docs.slice(startAt, startAt + limit);

    paginatedQuerySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    return results;
  } catch (error) {
    console.error('(searchByTitle) - Erro ao consultar a coleção "produtos":', error);
    throw error;
  }
};


// Função para listar todos os produtos
const findAllProducts = async () => {
  try {
    const produtosCollection = collection(database, 'produtos'); // Substitua 'produtos' pelo nome correto da sua coleção
    const querySnapshot = await getDocs(produtosCollection);

    const productsData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      productsData.push(data);
    });

    return productsData;
  } catch (error) {
    console.error('(findAllProducts) - Erro ao listar produtos:', error);
    throw error; // Re-throw o erro para que quem chama a função possa lidar com ele, se necessário.
  }
};

export { findAllProducts, searchByType, searchByTitle };
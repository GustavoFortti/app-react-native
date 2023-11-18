import db from './SQLiteDatabase'

db.transaction((tx) => {
  tx.executeSql(
    `
      CREATE TABLE IF NOT EXISTS Product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        categoria TEXT,
        tipo TEXT,
        subtipo TEXT,
        marca TEXT,
        preco REAL,
        quantidade INTEGER,
        unidade TEXT,
        descricao TEXT,
        link TEXT,
        imagem TEXT,
        tabela_nutricional TEXT
      );
      `,
    [],
    (tx, result) => {
      console.log('Tabela "Product" criada com sucesso.');
    },
    (error) => {
      console.error('Erro ao criar a tabela "Product":', error);
    }
  );
});

const insertProduct = (product) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO product (nome, categoria, tipo, subtipo, marca, preco, quantidade, unidade, descricao, link, imagem, tabela_nutricional)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
          product.nome,
          product.categoria,
          product.tipo,
          product.subtipo,
          product.marca,
          product.preco,
          product.quantidade,
          product.unidade,
          product.descricao,
          product.link,
          product.imagem,
          product.tabela_nutricional,
        ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Erro ao inserir o produto: " + JSON.stringify(product));
        },
        (_, error) => reject(error)
      );
    });
  });
};

// Função para buscar todos os produtos
export const findAllProducts = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * FROM product;
        `,
        [],
        (_, { rows }) => {
          const products = rows._array;
          // console.log("Produtos encontrados:");
          // console.log(products);
          resolve(products);
        },
        (error) => {
          console.error("Erro ao buscar produtos:", error);
          reject(error);
        }
      );
    });
  });
};

export const findFavoriteProducts = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * FROM product LIMIT 6;
        `,
        [],
        (_, { rows }) => {
          const products = rows._array;
          // console.log("Produtos encontrados:");
          // console.log(products);
          resolve(products);
        },
        (error) => {
          console.error("Erro ao buscar produtos:", error);
          reject(error);
        }
      );
    });
  });
};

export const searchByName = (name, startIndex = 0, itemsPerPage = 10, orderBy = 'default') => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      let query = "SELECT * FROM Product WHERE nome LIKE ?";

      if (orderBy === 'price_asc') {
        query += " ORDER BY preco ASC";
      } else if (orderBy === 'price_desc') {
        query += " ORDER BY preco DESC";
      }

      query += " LIMIT ? OFFSET ?";
      
      const params = [`%${name}%`, itemsPerPage, startIndex];

      tx.executeSql(
        query,
        params,
        (_, { rows }) => {
          const products = [];
          for (let i = 0; i < rows.length; i++) {
            const product = rows.item(i);
            products.push(product);
          }

          resolve(products);
        },
        (_, error) => reject(error)
      );
    });
  });
};

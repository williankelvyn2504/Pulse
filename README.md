# Pulse Database

Pulse Database é uma biblioteca simples para gerenciar um banco de dados em formato chave-valor, utilizando arquivos JSON para persistência de dados. Ideal para aplicações que requerem armazenamento leve e fácil acesso.

## Instalação

Você pode instalar o Pulse Database usando o npm:

```bash
npm install pulse-database
```
Uso

Abaixo está um exemplo de como usar o Pulse Database em seu projeto:

```javascript

// Importa a classe Pulse
import Pulse from 'pulse-database';

// Cria uma nova instância da Pulse Database
const db = new Pulse('./test.json');

// Adiciona um valor ao banco de dados
db.put('name', 'Gabriel');

// Recupera um valor do banco de dados
const name = db.get('name');
console.log(name); // Saída: Gabriel

// Remove um valor do banco de dados
db.remove('name');

// Verifica se o valor foi removido
const deletedName = db.get('name');
console.log(deletedName); // Saída: null
```

## Métodos Disponíveis

```javascript
put(key: string, value: any): void

// Adiciona ou atualiza um valor no banco de dados. Lança um erro se o valor for undefined.
```

```javascript
get(key: string): void | null

// Retorna o valor associado à chave especificada, ou null se a chave não existir.
```

```javascript
remove(key: string): void

// Remove o valor associado à chave especificada do banco de dados.
```

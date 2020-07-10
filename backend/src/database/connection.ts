import knex from 'knex'
import path from 'path'

const connection = knex({
    client:'sqlite3',
    connection:{
        // __dirname: retorna o caminho do diretório que está executando ele
        filename: path.resolve(__dirname,'database.sqlite') // padroniza o caminho que depende do SO

    },
    useNullAsDefault: true
})

export default connection;
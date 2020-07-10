import express from 'express'
import path from 'path'
import routes from './routes'
//npm install @types/cors -D
import cors from 'cors'

//a definição de tipos deve vir junto
// tem que saber o formato das fuções e tipagem do express
// npm install @types/express -D
// o parâmetro -D é de desenvolvimento, não vai ir no commit
const app = express()

app.use(cors())
app.use(express.json());
app.use(routes);
//função do express para arquivos estáticos
app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')) )
app.listen(3333);

// npm install ts-node
// npm install typescript -D
// npm install node-dev -D
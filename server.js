import express, {request} from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient
const app = express()
app.use(express.json())

/*
    Criar uma API de usuários

    - Criar um usuário
    - Listar todos os usuários
    - Editar um usuário
    - Deletar um usuário
*/



app.post('/users', async (req, res) => {
    
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/users', async (req, res) => {

    let user = []
    if (req.query){
        user = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    }else {
        users = await prisma.user.findMany()
    }

    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: "Usuário deletado com Sucesso"})
})

app.listen(8080)
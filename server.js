import express from 'express'
import morgan from 'morgan'
const PORT=3000

const app = express()

const todos = [
    { id:1, title: 'Hacer la compra', complete: false },
    { id:2, title: 'Terminar proyecto', complete: true },
    { id:3, title: 'Ejercicio diario', complete: false }
  ];

app.use(express.static('public'))
app.use(express.json()) // {"key": "value"}
app.use(express.urlencoded({ extended: true})) // key=value&key2=value2

//Routes 
app.get('/', (req, res) => {
    const alltodos = todos
    res.render('main.ejs',{todos})
})

app.get('/todo',(req, res) => {
    const alltodos = todos
    res.render('index.ejs',{todos})

})

app.get('/todo/new', (req, res) => {
    res.render('new.ejs')
})

app.post('/todo', (req, res) => {
    try {
        const newTodo = {}
        newTodo.id = Date.now()
        newTodo.title = req.body.title
        newTodo.complete = false

        todos.push(newTodo)
        //console.log(newTodo)
        //console.log(todos)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        //res.send(error)
    }
})

app.put('/todo/:id',(req,res)=>{
    try {
        const index = todos.findIndex(todo => todo.id == req.params.id);
        if (index !== -1) {
            todos[index].complete = !todos[index].complete;
        }
        res.render('index.ejs',{todos})
    } catch (error) {
        console.log(error)
        //res.send(error)
    }
})

app.delete('/todo/:id',(req, res) => {
    try {
        const index = todos.findIndex(todo => todo.id == req.params.id);
        if (index !== -1) {
            todos.splice(index,1)
        }
        res.render('index.ejs', {todos})
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`))
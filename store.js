



// App Code


const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

const RECIEVE_DATA = 'RECIEVE_DATA';


function addTodoAction (todo) {
    return {
      type: ADD_TODO,
      todo,
    }
  }
  
  function removeTodoAction (id) {
    return {
      type: REMOVE_TODO,
      id,
    }
  }
  
  function toggleTodoAction (id) {
    return {
      type: TOGGLE_TODO,
      id,
    }
  }
  
  function addGoalAction (goal) {
    return {
      type: ADD_GOAL,
      goal,
    }
  }
  
  function removeGoalAction (id) {
    return {
      type: REMOVE_GOAL,
      id,
    }
  }

  function recieveDataAction(todos, goals){
    return{
      type: RECIEVE_DATA, 
      todos, 
      goals
    }

  }

function todos (state = [], action) {
  console.log('todos reducer', action)
  switch(action.type) {
    case ADD_TODO :
      return state.concat([action.todo])
    case REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO :  
      return state.map((todo) => todo.id !== action.id ? todo :     
        Object.assign({}, todo, { complete: !todo.complete }))
    case RECIEVE_DATA:
      return action.todos
    default :
      return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    case RECIEVE_DATA:
      return action.goals
    default :
      return state
  }
}





// Middleware functions


const checker = (store) => (next)=> ( action) => {
  if (action.type === ADD_TODO 
    && action.todo.name.toLowerCase().includes('bitcoin')){
      return alert('not allowed')
  }  
  if (action.type === ADD_GOAL 
    && action.goal.name.toLowerCase().includes('bitcoin')){
      return alert('not allowed')
  }  
  return next(action)
}

const logger = (store) => (next)=> ( action) => {
  console.group(action.type)

    console.log('The Action', action)
    const result = next(action)
    console.log('The new state', store.getState())
    // console.log('res', result)

  console.groupEnd()
  return result
}

/************************************** */
  const store = Redux.createStore(
    Redux.combineReducers({
      todos, goals
    }), Redux.applyMiddleware(checker)
  )
  
  store.subscribe(() => {
    const{goals, todos} = store.getState()
//Empty lists
    document.getElementById('todos').innerHTML = ''
    document.getElementById('goals').innerHTML = ''

    
    goals.forEach(domGoal)
    todos.forEach(domTodo)
  })




document.getElementById('addTodo').addEventListener('click', ()=>{
    const todo = {
      id: Math.random()*10,
      name: document.getElementById('txtTodo').value,
      complete: false,
    }
    store.dispatch(
        
        addTodoAction(todo)
      )
    document.getElementById('txtTodo').value=''
})

document.getElementById('addGoal').addEventListener('click', ()=>{
    const goal = {
      id: Math.random()*10,
      name: document.getElementById('txtGoal').value,
      complete: false,
    }
    store.dispatch(
      
      addGoalAction(goal)
    )
    document.getElementById('txtGoal').value=''
})

const removeBtn = onClick =>{
  const btn = document.createElement('button')
  btn.innerHTML = 'X'
  btn.addEventListener('click', onClick)
  return btn
}

const domTodo = todo =>{
  const li = document.createElement('li')
  li.id = todo.id
  li.innerHTML = todo.name //+ JSON.stringify(todo)
  li.style.textDecoration = (todo.complete) ?'line-through':'none'
  
  li.addEventListener('click', ()=> {
    store.dispatch( toggleTodoAction(todo.id))
  })
  li.append(removeBtn(()=>store.dispatch(removeTodoAction(todo.id))))
  document.getElementById('todos').append(li)
}

const domGoal = goal =>{
  const li = document.createElement('li')
  li.id = goal.id
  li.innerHTML = goal.name
  li.append(removeBtn(()=>store.dispatch(removeGoalAction(goal.id))))

  document.getElementById('goals').append(li)
}


function createStore (reducer) {
    


    // 1. the state
    let state


    // 2. Get the state
    const  getState = () => state

    // 3. Listin to changes
    let listiners = []

    const subscribe = (listiner)=>{
        listiners.push(listiner)
    }

    // 4. update state
    const dispatch = (action)=>{
        state = reducer(state, action)
        listiners.forEach(
            (l)=>l()
        )
    }

    return{
        getState, 
        subscribe,
        dispatch
    }
}
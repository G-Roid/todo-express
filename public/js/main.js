const deleteBtn = document.querySelectorAll('.fa-trash')
const items= document.querySelectorAll('.notComplete')
const completedItems = document.querySelectorAll('.completed')


//Add eventListener to each delete btn
Array.from(deleteBtn).forEach(btn => {
    btn.addEventListener('click', deleteTask)
})

Array.from(items).forEach(task => {
    task.addEventListener('click', markComplete)
})

Array.from(completedItems).forEach(task => {
    task.addEventListener('click', markNotComplete)
})

async function markNotComplete() {
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        console.log(itemText)
        const response = await fetch('markNotComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                itemFromJS: itemText
            })

        })
        const data = await response.json()
        console.log(data)
        location.reload()
        
    } catch (error) {
        console.log(error)
    }
}

async function deleteTask(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markComplete() {
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                itemFromJS: itemText    
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        
    } catch (error) {
        console.log(error)
    }
}



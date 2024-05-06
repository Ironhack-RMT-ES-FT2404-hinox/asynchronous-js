/*

const btnNode = document.querySelector("#spacex-btn")

btnNode.addEventListener("click", () => {

  // https://api.spacexdata.com/v5/launches/latest

  // fetch nos permite anclarnos a una API para buscar data
  // fecth nos devuelve la data en un formato de PROMESA => obj que denota que la respuesta tarda cierto tiempo real. 0.2s

  fetch("https://api.spacexdata.com/v5/launches")
  .then((respuesta) => {
    // espera el tiempo necesario de esta operacion asincrona
    // console.log(respuesta)
    // esta respuesta no está en formate legible para JS
    return respuesta.json()

  })
  .then((respuesta2) => {

    console.log(respuesta2)
    const divNode = document.querySelector("#logos")
    respuesta2.forEach((eachLanzamiento) => {
      const imgNode = document.createElement("img")
      imgNode.src = eachLanzamiento.links.patch.small
      imgNode.style.width = "150px"
      divNode.append(imgNode)
    })


  })


  fetch("https://api.spacexdata.com/v4/crew/5f7f1543bf32c864a529b23e")
  .then((response) => {
    return response.json()
  })
  .then((theCrew) => {
    console.log(theCrew)
  })

})




// Replicamos comportamientos de API

//* AQUI REPLICO UNA DATA QUE VIENE EXTERNA
function pedirUnLibro(bookId, dataIsReadyCallback, errorCallback) {

  // const functionCallback = (data) => { ... }

  let foundBook;
  
  // replicando que esta llamada toma cierto tiempo real.
  setTimeout(() => {

    const booksArr = [
    {
      id: 1,
      title: "La comunidad del anillo",
      description: "..."
    },
    {
      id: 2,
      title: "Las dos torres",
      description: "..."
    },
    {
      id: 3,
      title: "El retorno del rey",
      description: "..."
    },
    //... muchos más libros
    ]

    // retornamos el libro por ese id
    foundBook = booksArr.find((eachBook) => eachBook.id === bookId)
    // console.log(foundBook)

    if (foundBook === undefined) {
      errorCallback("Libro no existe con ese Id")
    } else {
      dataIsReadyCallback(foundBook)
    }

  }, Math.floor( Math.random() * 3000 ))
  
  // return foundBook
}

//* AQUI REPLICO MI ORDENADOR ACCEDIENTO A ESA DATA
// let theBook = pedirUnLibro(2)
// console.log(theBook)

pedirUnLibro(1, (data) => {
  console.log(`El libro a leer es: ${data.title}`)

  pedirUnLibro(2, (data) => {
    console.log(`El libro a leer es: ${data.title}`)

    pedirUnLibro(3, (data) => {
      console.log(`El libro a leer es: ${data.title}`)

      pedirUnLibro(4, (data) => {
        console.log(`El libro a leer es: ${data.title}`)
  
      }, (error) => {
        console.log(`el error es: ${error}`)
      })

    }, (error) => {
      console.log(`el error es: ${error}`)
    })

  }, (error) => {
    console.log(`el error es: ${error}`)
  })


}, (error) => {
  console.log(`el error es: ${error}`)
})


*/



//* PROMESAS

function pedirUnLibroPromesa(bookId) {

  return new Promise((resolve, reject) => {

    // replicando que esta llamada toma cierto tiempo real.
    setTimeout(() => {
  
      const booksArr = [
      {
        id: 1,
        title: "La comunidad del anillo",
        description: "..."
      },
      {
        id: 2,
        title: "Las dos torres",
        description: "..."
      },
      {
        id: 3,
        title: "El retorno del rey",
        description: "..."
      },
      //... muchos más libros
      ]
  
      // retornamos el libro por ese id
      let foundBook = booksArr.find((eachBook) => eachBook.id === bookId)
  
      if (foundBook === undefined) {
        reject("Libro no existe con ese Id")
      } else {
        resolve(foundBook)
      }
  
    }, Math.floor( Math.random() * 3000 ))

  })
    
}




//* Como resolver promesas con .then() & .catch()

// const book = pedirUnLibroPromesa(445)
// console.log(book) // estado pendiente

// book.then((response) => {
//   // espera que la promesa sea resuelta correctamente (success) antes de ejecutar esto
//   console.log(book) // estado fulfilled
//   console.log(response) // response es la respuesta (la data)
// })
// .catch((error) => {
//   console.log(book) // estado rejected
//   console.log(error)
// })


const booksNode = document.querySelector("#books")

pedirUnLibroPromesa(1)
.then((book) => {
  console.log(`Leyendo el libro: ${book.title}`)

  booksNode.innerHTML += `<li>${book.title}</li>`
  
  // en un .then yo puedo encadenar nuevas llamadas, esas llamadas devolveran nuevas promesas y las resolvemos con otro .then
  return pedirUnLibroPromesa(555)
})
.then((book2) => {
  console.log(`Leyendo el libro: ${book2.title}`)
  booksNode.innerHTML += `<li>${book2.title}</li>`
  return pedirUnLibroPromesa(3)
})
.then((book3) => {
  console.log(`Leyendo el libro: ${book3.title}`)
  booksNode.innerHTML += `<li>${book3.title}</li>`
})
.catch((error) => {
  console.log(error)
})
.finally(() => {
  // esto ocurre siempre, haya fallado o haya sido resuelta correctamente la promesa
  console.log("Esto se ve siempre, luego de que terminen las operaciones asincronas")
  // funcionales de limpieza
  
})



// muchas veces queremos resolver multiples promesas en el menor tiempo posible (NO DEPENDEN ENTRE ELLAS)

// Promise.all => resolver multiples promesas a la vez

Promise.all( [
  pedirUnLibroPromesa(1),
  pedirUnLibroPromesa(55),
  pedirUnLibroPromesa(3)
] )
.then((respuestaDeTodasLasPromesas) => {
  console.log(respuestaDeTodasLasPromesas)
})
.catch((error) => {
  console.log(error)
})



Promise.allSettled( [
  pedirUnLibroPromesa(1),
  pedirUnLibroPromesa(55),
  pedirUnLibroPromesa(3)
])
.then((respuestaDeTodasLasPromesas) => {
  console.log(respuestaDeTodasLasPromesas)
  // el allSettled no requiere de un .catch, toda la info esta en el .then (si falla o si no falla)
})
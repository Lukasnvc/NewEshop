const cartInfo = document.querySelector('#cartInfo');
const topTitle = document.querySelector('#topTitle');
const mainIndex = document.querySelector('#mainIndex');
const tshirts = document.querySelector('#tshirts');
const hoodies = document.querySelector('#hoodies');
const sweatshirts = document.querySelector('#sweatshirts');
const hats = document.querySelector('#hats');
const liked = document.querySelector('#liked');
const cart = document.querySelector('#cart');
const cartTotal = document.querySelector('#cartTotal');
const buy = document.querySelector('#buy');
const deleteAll = document.querySelector('#deleteAll');
const totalPcsH2 = document.querySelector('#totalPcs');
const mobileNav = document.querySelector('#mobileNav');
const mobileList = document.querySelector('#mobileList');
const closeBtn = document.querySelector('#closeBtn');

const mainIndex1 = document.querySelector('#mainIndex1');
const tshirts1 = document.querySelector('#tshirts1');
const hoodies1 = document.querySelector('#hoodies1');
const sweatshirts1 = document.querySelector('#sweatshirts1');
const hats1 = document.querySelector('#hats1');
const liked1 = document.querySelector('#liked1');
const cart1 = document.querySelector('#cart1');
const cartPcs = document.querySelector('#cartPcs');

mainIndex1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'all');
  window.location.href = 'index.html';
})

tshirts1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'tshirt');
  window.location.href = 'categories.html';
})

hoodies1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hoodie');
  window.location.href = 'categories.html';
})

sweatshirts1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'sweatshirt');
  window.location.href = 'categories.html';
})

hats1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hat');
  window.location.href = 'categories.html';
})

liked1.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'like');
  window.location.href = 'categories.html';
})

mobileNav.addEventListener('click', () => {  
    mobileList.style.right= '0px';
    mobileList.style.top= '-20px';
})

closeBtn.addEventListener('click', () => {
  mobileList.style.right='-180px';
  mobileList.style.top='-500px'
})


mainIndex.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'all');
  window.location.href = 'index.html';
})

tshirts.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'tshirt');
  window.location.href = 'categories.html';
})

hoodies.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hoodie');
  window.location.href = 'categories.html';
})

sweatshirts.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'sweatshirt');
  window.location.href = 'categories.html';
})

hats.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'hat');
  window.location.href = 'categories.html';
})

liked.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.setItem('categorie', 'like');
  window.location.href = 'categories.html';
})

const getData = () => {
  fetch('https://testapi.io/api/lukasnvc/resource/NewEshop',
{
  method: 'GET',
  headers: {
    'Content-Type':
    'application/json'
  }
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
	return result.data
})
.then((data) => {
  cartInfo.innerHTML='';
  stateCheck()
  filtring(data);
  cartCheck(data);
})
}

getData()

const id=localStorage.getItem('item_id');

const stateCheck = () => {
  const state = localStorage.getItem('state');
  if (state == 'true') {
    login.style.display = 'none';
    logout.style.display = 'block';
    liked.style.display = 'block';
    liked1.style.display = 'block';
  } else {
    login.style.display = 'block';
    logout.style.display = 'none';
    liked.style.display = 'none';
    liked1.style.display = 'none';
  }
}



const filtring = (data) => {
  const likedArr = JSON.parse(localStorage.getItem('likedArray')) || [];
  let totalPrice = [];
  let totalPcs = [];
  if (totalPrice.length<1) {
    cartPcs.style.display= 'none';
    totalPcsH2.innerHTML='';
    cartTotal.innerHTML = 'No items in cart';
    buy.style.display= 'none';
    deleteAll.style.display= 'none';
  } 
  data.forEach(element => {
    let b = JSON.parse(element.reserve)
    b.forEach((x, index) => {
      
      if (x>0){
        
        draw(element, index, x ,totalPrice, totalPcs);
      } else {
      }
    })
  })
  if (likedArr.length>0) {
    liked.style.color= 'red'
  } else {
    liked.style.color= 'black'
  }
}


const cartCheck = (data) => {
  data.forEach(element => {
    let b = JSON.parse(element.reserve)
    b.forEach((x) => {
      if (x>0){
        cart.style.color= '#F68E5F';
      } 
    })
  })
}



const draw = (product, index, x, totalPrice, totalPcs) => {

  const pic = JSON.parse(product.picUrl);
  
  const img = document.createElement('img');
  img.src=pic[0];

  const name = document.createElement('h3');
  name.textContent=product.name;

  const numberOfItems = document.createElement('span');

  const productSize = document.createElement('span');
  numberOfItems.textContent= `Pieces : ${x}`;
  if (index == 0){
    productSize.textContent= 'Size : S'
   
  } else if (index == 1) {
    productSize.textContent= 'Size : M';
  } else if (index == 2) {
    productSize.textContent= 'Size : L';
  } else if (index == 3) {
    productSize.textContent= 'Size : XL';
  }

  totalPcs.push(x)
  const price = document.createElement('span');
  price.textContent= `Price total : ${x*product.price}$`;

  let multipPrice = x*product.price;
  totalPrice.push(multipPrice);


  const addBtn = document.createElement('button');
  addBtn.setAttribute('class', 'addBtn');
  addBtn.textContent= 'Add Item';

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'deleteBtn');
  deleteBtn.textContent= 'Remove Item';

  const div3 = document.createElement('div');
  div3.setAttribute('class', 'buttons');
  div3.appendChild(addBtn);
  div3.appendChild(deleteBtn);

  const div2 = document.createElement('div')
  div2.setAttribute('class', 'productDetails');
  div2.appendChild(name);
  div2.appendChild(productSize);
  div2.appendChild(numberOfItems);
  div2.appendChild(price);
  div2.appendChild(div3);

  const div1 = document.createElement('div')
  div1.setAttribute('class', 'productCard');
  div1.appendChild(img);
  div1.appendChild(div2);

  cartInfo.appendChild(div1)

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(product, index);
  })

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeFromCart(product, index);
  })
  sum = totalPrice.reduce((a, b) => a + b, 0);
  cartTotal.textContent= `Total ${sum}$`;
  sumPcs= totalPcs.reduce((a,b) => a + b, 0);
  totalPcsH2.textContent= `${sumPcs} pcs.`
  cartPcs.textContent = sumPcs; 
  cartPcs.style.display = 'block';
  buy.style.display = 'block';
  deleteAll.style.display = 'block';
  buyDeleteReserve(product, index);
  deleteAllItems(product, index , x);
}

const addToCart = (data, index) => {
  
  let parsedReserve = JSON.parse(data.reserve);
  let parsedSize = JSON.parse(data.size);
  if (parsedSize[index]>0){
    parsedSize[index]-=1;
  parsedReserve[index]+=1;

  editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
  }
}

const removeFromCart = (data, index) => {
  let parsedReserve = JSON.parse(data.reserve);
  let parsedSize = JSON.parse(data.size);
  if (parsedReserve[index]>0) {
    parsedSize[index]+=1;
    parsedReserve[index]-=1;
  
    editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
  }
}

const buyDeleteReserve = (data, index) => {
  buy.addEventListener('click', (e) => {
    e.preventDefault();
    let parsedSize = JSON.parse(data.size);
    let parsedReserve = JSON.parse(data.reserve);
    parsedReserve[index] = 0;
    
    editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
    getData()
  })
}

const deleteAllItems = (data, index, x) => {
  deleteAll.addEventListener('click', (e) => {
    e.preventDefault();
    let parsedSize = JSON.parse(data.size);
    let parsedReserve = JSON.parse(data.reserve);
    parsedSize[index] +=x;
    parsedReserve[index] = 0;
    editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
    getData()
  })
}

const editProduct = (id, color, name, sizes, reserve, description, price, picUrl, type) => {
  fetch(`https://testapi.io/api/lukasnvc/resource/NewEshop/${id}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type':
      'application/json'
    },
    body: JSON.stringify({
      color: `${color}`,
      name: `${name}`,
      size: JSON.stringify(sizes),
      reserve: JSON.stringify(reserve),
      description: `${description}`,
      price: `${price}`,
      picUrl: `${picUrl}`,
      type:  `${type}`
    }) 
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((result) => {
   
    cart.style.color= 'black';
    getData()
  })
}



fetch('	https://testapi.io/api/lukasnvc/resource/sliderPics',
{
  method: 'GET',
  headers: {
    'Content-Type':
    'application/json'
  }
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
	return result.data
})
.then((data) => {
	drawSlider(data)
})


const drawSlider = (data) => {
  let index = 0;
  setInterval (function(){
    let imageSources = [];
    data.forEach(element => {
      imageSources.push(element.pics)
    })
    if (index === imageSources.length) {
      index = 0;
    }
    document.getElementById('slide').src = imageSources[index];
    index++;
  } , 2500);
} 


const loginNav = document.querySelector('#login');
const logout = document.querySelector('#logout');
const loginBox = document.querySelector('#loginBox');
const closeLogin = document.querySelector('#closeLogin');
const usernameLogin = document.querySelector('#username');
const passwordLogin = document.querySelector('#password');
const errorLogin = document.querySelector('#error');
const loginBtn = document.querySelector('#loginBtn');
const registerLogin = document.querySelector('#register');
const registerBox = document.querySelector('#registerBox');
const closeRegister = document.querySelector('#closeRegister');
const registerUsername = document.querySelector('#registerUsername');
const registerPassword1 = document.querySelector('#registerPassword1');
const registerPassword2 = document.querySelector('#registerPassword2');
const registerError = document.querySelector('#registerError');
const registerBtn = document.querySelector('#registerBtn');
const email = document.querySelector('#email');




const importNewUser = (username, password, likes, email) => {
	fetch(`https://testapi.io/api/lukasnvc/resource/usersEshop`,
	{
		method: 'POST',
		headers: {
			'Content-Type':
			'application/json'
		},
		body: JSON.stringify({
			username: `${username}`,
      password: `${password}`,
      liked: `${likes}`,
      email: `${email}`
		}) 
	})
	.then((response) => {
		if (response.ok) {
      getUserData();
		}
	})
}

const getUserData = () => {
  fetch('	https://testapi.io/api/lukasnvc/resource/usersEshop',
{
  method: 'GET',
  headers: {
    'Content-Type':
    'application/json'
  }
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
	return result.data
})
.then((data) => {
  checkUser(data)
  getData()
})
}
getUserData()



const userLikes = (id, username, password, likes, email) => {
	fetch(`https://testapi.io/api/lukasnvc/resource/usersEshop/${id}`,
	{
		method: 'PUT',
		headers: {
			'Content-Type':
			'application/json'
		},
		body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
      liked: `${likes}`,
      email: `${email}`
		}) 
	})
	.then((response) => {
		if (response.ok) {
			return response.json()
		}
	})
	.then((result) => {
    getUserData()
		console.log('Fetching data : ', result);
	})
}





loginNav.addEventListener('click', () => {
  loginBox.style.display = 'flex';
})

closeLogin.addEventListener('click', () => {
  loginBox.style.display = 'none';
})

registerLogin.addEventListener('click', () => {
  loginBox.style.display = 'none';
  registerBox.style.display = 'flex';
})

closeRegister.addEventListener('click', () => {
  registerBox.style.display = 'none';
})

logout.addEventListener('click', () => {
  login.style.display = 'block';
  logout.style.display = 'none';
  localStorage.setItem('user', '');
  localStorage.setItem('state', 'false');
  localStorage.clear()
  getData()
  window.location.href = 'index.html';
})

registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (registerPassword1.value===registerPassword2.value){
    const likes = JSON.stringify([]);
  importNewUser(registerUsername.value, registerPassword1.value, likes, email.value);
  registerBox.style.display = 'none';
  loginBox.style.display = 'flex';
  usernameLogin.value = registerUsername.value;
  } else {
    registerError.style.display = 'block';
  }
})

const checkUser = (data) => {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault()

    data.forEach(user => {
      if (user.username==username.value && user.password==password.value) {
        loginBox.style.display = 'none';
        localStorage.setItem('user', user.id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('password', user.password);
        localStorage.setItem('email', user.email);
        localStorage.setItem('likedArray', user.liked);
        localStorage.setItem('state', 'true');
        login.style.display = 'none';
        logout.style.display = 'block';
        getData()
      } else {
        errorLogin.style.display = 'block';
      }
    })
  })
}

const addLike = (like) => {
  const id = localStorage.getItem('user');
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const email = localStorage.getItem('email');
  localStorage.setItem('likedArray', like);
  const jsonLike = JSON.stringify(like)
  userLikes(id,username,password,jsonLike,email);

}
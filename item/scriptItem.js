const itemCard = document.querySelector('#item');
const mainIndex = document.querySelector('#mainIndex');
const tshirts = document.querySelector('#tshirts');
const hoodies = document.querySelector('#hoodies');
const sweatshirts = document.querySelector('#sweatshirts');
const hats = document.querySelector('#hats');
const itemImg = document.querySelector('#itemImg');
const itemName = document.querySelector('#itemName');
const itemCategorie = document.querySelector('#itemCategorie');
const itemColor = document.querySelector('#itemColor');
const sizeS = document.querySelector('#s');
const sizeM = document.querySelector('#m');
const sizeL = document.querySelector('#l');
const sizeXl = document.querySelector('#xl');
const itemDescription = document.querySelector('#itemDescription');
const itemPrice = document.querySelector('#itemPrice');
const outOfStock = document.querySelector('#OutOfStock');
const title = document.querySelector('title');
const likeBtn = document.querySelector('#like');
const liked = document.querySelector('#liked');
const toCart = document.querySelector('#toCart');
const sizeDropDown = document.querySelector('#sizeDropDown');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const sizeForm = document.querySelector('#sizeForm');
const cart = document.querySelector('#cart');
const dropdownCart = document.querySelector('#cartsDp');
const cartDropdownItem = document.querySelector('#cartDropdownItem');
const cartTotal = document.querySelector('#cartTotal');
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
const cartPcs1 = document.querySelector('#cartPcs1');

const login1 = document.querySelector('#login1');
const logout1 = document.querySelector('#logout1');

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

cart1.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'cart.html';
})

mobileNav.addEventListener('click', () => {  
    mobileList.style.right= '0px';
    mobileList.style.top= '-20px';
})

closeBtn.addEventListener('click', () => {
  mobileList.style.right='-180px';
  mobileList.style.top='-500px'
})

login1.addEventListener('click', () => {
  mobileList.style.right='-180px';
  mobileList.style.top='-500px';
  loginBox.style.display = 'flex';
})

logout1.addEventListener('click', () => {
  login.style.display = 'block';
  logout.style.display = 'none';
  localStorage.setItem('user', '');
  localStorage.setItem('state', 'false');
  localStorage.clear()
  getData()
  window.location.href = 'index.html';
})


const id=localStorage.getItem('item_id');

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

cart.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'cart.html';
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
  cartDropdownItem.innerHTML='';
  stateCheck()
  itemCount(data);
  cartCheck(data);
	itemPicker(data);
})
}

getData()

const stateCheck = () => {
  const state = localStorage.getItem('state');
  if (state == 'true') {
    login.style.display = 'none';
    login1.style.display = 'none';
    logout.style.display = 'block';
    logout1.style.display = 'block';
    liked.style.display = 'block';
    liked1.style.display = 'block';
    likeBtn.style.display = 'block';
  } else {
    login.style.display = 'block';
    login1.style.display = 'block';
    logout.style.display = 'none';
    logout1.style.display = 'none';
    liked.style.display = 'none';
    liked1.style.display = 'none';
    likeBtn.style.display = 'none';
  }
}

const cartCheck = (data) => {
  data.forEach(element => {
    let b = JSON.parse(element.reserve);
    b.forEach((x) => {
      if (x>0){
        cart.style.color= '#F68E5F';
      } 
    })
  })
}

const itemPicker = (data) => {
  data.forEach(element => {
    if (element.id === +id){
      const likedArr = JSON.parse(localStorage.getItem('liked')) || [];
      itemImg.innerHTML='';
      draw(element, likedArr);
      toReserve(element);
    }
  });
}

const draw = (data, likedArr) => {
  
  const pics = JSON.parse(data.picUrl);
  pics.forEach(element => {
    title.textContent = data.name;
    const itemPic = document.createElement('img');
    itemPic.setAttribute('class', 'ItemImg')
    itemPic.src=element;
    itemImg.appendChild(itemPic)

    const state = localStorage.getItem('state');
    let likedArr = JSON.parse(localStorage.getItem('likedArray')) || [];
    if (state == 'true') {
    if (likedArr.length>0) {
      liked.style.color= 'red';
    } else {
      liked.style.color= 'black';
    }
    if (likedArr.includes(+id)) {
      likeBtn.setAttribute('class', 'liked fa-solid fa-heart');
    } else {
      likeBtn.setAttribute('class', 'fa-regular fa-heart');
    }
    }
  })
  let itemId = data.id;
  if (likedArr.includes(+itemId)) {
    likeBtn.setAttribute('class', 'liked fa-solid fa-heart')
  }
  
  itemName.textContent = data.name;
  itemCategorie.textContent = data.type;
  itemColor.textContent = data.color;

  const sizes = JSON.parse(data.size);
  if (sizes[0]== 0) {
    sizeS.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock';
    option1.setAttribute('disabled', '')

  }
  if (sizes[1]== 0) {
    sizeM.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock'
    option2.setAttribute('disabled', '')
  }
  if (sizes[2]== 0) {
    sizeL.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock';
    option3.setAttribute('disabled', '')
  }
  if (sizes[3]== 0) {
    sizeXl.setAttribute('class', 'empty');
    outOfStock.textContent = 'Red sizes out of stock';
    option4.setAttribute('disabled', '')
  }

  itemDescription.textContent = data.description;
  itemPrice.textContent = `${data.price}$`;
}


likeBtn.addEventListener('click', (e) =>{
  e.preventDefault()
  let likedArr = JSON.parse(localStorage.getItem('likedArray')) || [];
  if (likedArr.includes(+id)) {
    console.log('includes', id, likedArr)
    let i = likedArr.indexOf(+id);
    likedArr.splice(i,1);
    let jsonLiked = JSON.stringify(likedArr);
    addLike(jsonLiked);
    likeBtn.setAttribute('class', 'fa-regular fa-heart')
  } else {
    console.log('NOT includes', id, likedArr)
    likeBtn.setAttribute('class', 'liked fa-solid fa-heart')
    likedArr.push(+id);
    let jsonLiked = JSON.stringify(likedArr);
    addLike(jsonLiked);
  }
})


let pickedSize

sizeDropDown.addEventListener('change', (e) => {
  e.preventDefault();
  sizeDropDown.style.backgroundColor= 'white';
  sizeForm.style.color= 'black';
  pickedSize = +sizeDropDown.value;
  })
   
const toReserve = (data) => {
toCart.addEventListener('click', (e) => {
  e.preventDefault();

  if (pickedSize === 0 || pickedSize > 0) {
    sizeDropDown.value= "undefined";

    let parsedReserve = JSON.parse(data.reserve);
    let parsedSize = JSON.parse(data.size);
    parsedSize[pickedSize]-=1;
    parsedReserve[pickedSize]+=1;

    setTimeout(() => {
      dropdownCart.style.display = 'none';
    }, 3000)
  

    editProduct(data.id, data.color, data.name, parsedSize, parsedReserve, data.description, data.price, data.picUrl, data.type);
    
  } else {
    sizeDropDown.style.backgroundColor= 'red';
    sizeForm.style.color= 'red';
  }
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
		itemImg.innerHTML='';
    dropdownCart.style.display = 'block';
		getData()
	})
}

const itemCount = (data) => {
  let totalPrice = [];
  let countArr =[];
  data.forEach(element => {
    const item = JSON.parse(element.reserve)
    item.forEach((x, index) => {
      if (x>0) {
        countArr.push(x)
        cartDraw(element, index, x ,totalPrice);
        cartPeaklook()
      }
    })
  })
  sumPcs= countArr.reduce((a,b) => a + b, 0);
  if (sumPcs>0) {
    cartPcs.style.display='block';
    cartPcs.textContent = sumPcs; 
    cartPcs1.style.display='block';
    cartPcs1.textContent = sumPcs; 
  } else {
    cartPcs.style.display='none';
    cartPcs1.style.display='none';
  }
}

const cartDraw = (product, index, x, totalPrice) => {
  const pic = JSON.parse(product.picUrl);
  const img = document.createElement('img');
  img.src=pic[0];

  const name = document.createElement('h3');
  name.textContent=product.name;

  const numberOfItems = document.createElement('span');

  const productSize = document.createElement('span');
  numberOfItems.textContent= ` pcs. ${x}`;
  if (index == 0){
    productSize.textContent= 'Size : S'
  } else if (index == 1) {
    productSize.textContent= 'Size : M';
  } else if (index == 2) {
    productSize.textContent= 'Size : L';
  } else if (index == 3) {
    productSize.textContent= 'Size : XL';
  }
 
  const price = document.createElement('span');
  price.textContent= `${x*product.price}$`;

  let multipPrice = x*product.price;
  totalPrice.push(multipPrice);

  const li = document.createElement('li')
  li.appendChild(img);
  li.appendChild(name);
  li.appendChild(productSize);
  li.appendChild(numberOfItems);
  li.appendChild(price);

  cartDropdownItem.appendChild(li);

  sum = totalPrice.reduce((a, b) => a + b, 0);
  cartTotal.textContent= `Total ${sum}$`;
}

const cartPeaklook = () => {
  cart.addEventListener('mouseover', () => {
    dropdownCart.style.display = 'block';
  })
  
  cart.addEventListener('mouseout', () => {
      dropdownCart.style.display = 'none';
  })
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
        login1.style.display = 'none';
        logout.style.display = 'block';
        logout1.style.display = 'block';
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
  userLikes(id,username,password,like,email);

}
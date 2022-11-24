const filterColor = document.querySelector('#filterColor');
const filterSearch = document.querySelector('#filterSearch');
const products = document.querySelector('#products');
const mainIndex = document.querySelector('#mainIndex');
const tshirts = document.querySelector('#tshirts');
const hoodies = document.querySelector('#hoodies');
const sweatshirts = document.querySelector('#sweatshirts');
const hats = document.querySelector('#hats');
const admin = document.querySelector('#admin');
const liked = document.querySelector('#liked');
const cart = document.querySelector('#cart');
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
const cartPcs = document.querySelector('#cartPcs')

const dropdownCart = document.querySelector('#cartsDp');
const cartDropdownItem = document.querySelector('#cartDropdownItem');
const cartTotal = document.querySelector('#cartTotal');

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
  products.innerHTML='';
  itemCount(data);
	draw(data);
  search(data);
  colorSearch(data);
  stateCheck();
  cartCheck(data)
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
  } else {
    login.style.display = 'block';
    login1.style.display = 'block';
    logout.style.display = 'none';
    logout1.style.display = 'none';
    liked.style.display = 'none';
    liked1.style.display = 'none';
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

const draw = (data) => {
  let likedArr = JSON.parse(localStorage.getItem('likedArray')) || [];
  data.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'product');

    const state = localStorage.getItem('state');
  if (state == 'true') {
    const likedBtn = document.createElement('i');
    likedBtn.setAttribute('class', 'fa-regular fa-heart');
    if (likedArr.includes(element.id)) {
      likedBtn.setAttribute('class', 'liked fa-solid fa-heart');
    }
    if (likedArr.length>0) {
      liked.style.color= 'red'
    } else {
      liked.style.color= 'black'
    }
    div.appendChild(likedBtn);
    likedBtn.addEventListener('click', (e) => {
      e.preventDefault()
      
      if (likedArr.includes(element.id)) {
        let i = likedArr.indexOf(element.id);
        likedArr.splice(i,1);
        let jsonLiked = JSON.stringify(likedArr);
        addLike(jsonLiked);
      } else {
        likedArr.push(element.id);
        let jsonLiked = JSON.stringify(likedArr);
        addLike(jsonLiked);
      }
    })
    }

    const pic = JSON.parse(element.picUrl);
    const img = document.createElement('img');
    img.setAttribute('class', 'productImg');
    img.src= pic[0]

    const name = document.createElement('h3');
    name.setAttribute('class', 'productName');
    name.textContent= element.name;

    const price = document.createElement('h4');
    price.setAttribute('class', 'productPrice');
    price.textContent= `${element.price}$`

    
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(price);
   
    products.appendChild(div);

    img.addEventListener('click', (e) => {
      e.preventDefault();
      pushUser(element);
      window.location.href = 'item.html';
   

      getData()
    })
  });
}

const search = (data) => {
filterSearch.addEventListener('keyup', (e) => {
const b = e.target.value.toLowerCase();
const filteredProducts = data.filter((products) => {
  return (
    products.name.toLowerCase().includes(b)
  );
})
if (b){
  products.innerHTML=null;
  draw(filteredProducts);
  } else {
  products.innerHTML=null;
  getData()
  }
})
}

const colorSearch = (data) => {
  filterColor.addEventListener('change', (e) => {
    e.preventDefault();
    console.log(filterColor.value);
    const value = filterColor.value;
    const filteredColor = data.filter((products) => {
      return (
        products.color.includes(value)
      );
    })
    if (value) {
      products.innerHTML=null;
      draw(filteredColor);
    } else {
      products.innerHTML=null;
      getData()
    }
  })
}

const pushUser = (item) => {
  let id =item.id;
  localStorage.setItem('item_id', id);
}

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

admin.addEventListener('click', () => {
  localStorage.clear();
  localStorage.setItem('categorie', 'like');
  window.location.href = 'admin.html';
})

cart.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'cart.html';
})


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
    cartPcs.textContent = sumPcs; 
    cartPcs.style.display='block';
  } else {
    cartPcs.style.display='none';
  }
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






const importNewUser = (username, password,likes, email) => {
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


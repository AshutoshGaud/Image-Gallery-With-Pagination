import React,{useEffect} from 'react'
import axios from 'axios'
//axios ek popular JavaScript library hai jo HTTP requests bhejne ke liye use hoti hai. Ye promise-based hoti hai aur ye browser aur Node.js dono me kaam karti hai. Ye humare liye API se data fetch karne ka kaam karti hai.


const App = () => {
//useState likhne ka 2 traika hota h like 1st const [state, setState] = React.useState(initialValue) 2nd traika hota h like const [state, setState] = useState(initialValue) but for 2nd traika hume useState ko import karna padta h from react like import React, { useState } from 'react' and for 1st traika hume useState ko import karne ki jarurat nhi h

//useState data ko store karne ke liye use hota h aur ye ek function return karta h jisme 2 value hoti h like 1st value state ki current value hoti h aur 2nd value ek function hota h jisse hum state ki value ko update karte h...like yaha humne index ki initial value 1 rakhi h aur setIndex function ka use karke hum index ki value ko update karte h...like jab user Next button par click karega to setIndex(index + 1) call hoga jisse index ki value 1 se badhkar 2 ho jayegi aur jab user Prev button par click karega to setIndex(index - 1) call hoga jisse index ki value 2 se ghatkar 1 ho jayegi...
  const [index, setIndex] = React.useState(1)
  const totalPages = 100
  const [userData, setUserData] = React.useState([])
  //isLoading state ka use hum data fetch hone ke process ko track karne ke liye karte h...like jab data fetch ho raha h to isLoading ki value true hoti h aur jab data fetch ho jata h to isLoading ki value false ho jati h...iske basis par hum user ko loading ka message show karte h ya iamge show hoti h...
  const [isLoading, setIsLoading] = React.useState(true)

  //async mtlb ye js ka asyncronised function h jisme hum await ka use karte h aur ye function hamesha promise return karta h like sync ek ke baad ek execute karta h but with async multiple function execute hota h like jisko jada time lag raha h uska wait karta h but 2nd function bhi sath me run karta rhta h ...or jisko jada time lagta h uske liye await ka use karte h jisse wo function wait karega jab tak wo complete nhi hota h...
  const getData = async () => {
    setIsLoading(true)
    setUserData([])
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=100`)
    setUserData(response.data)
    setIsLoading(false)
  }

// [index] React ko batata hai:
// "Jab bhi index ki value change ho, tab useEffect ke andar ka code dobara run karna."
// Yaani React index ki purani aur nayi value compare karta hai.
// Agar index ki value change hoti hai, tab useEffect ke andar ka code execute hota hai.
//getData function ko dobara call karta hai, jisse nayi API request bheji jaati hai aur nayi data fetch hoti hai.
//useEffect ke andar ka code tabhi execute hota hai jab index ki value change hoti hai, isliye humne index ko dependency array me rakha hai. Agar humne dependency array me kuch bhi nahi rakha hota, to useEffect sirf component ke initial render par hi execute hota aur dobara execute nahi hota. Agar humne dependency array me index ko rakha hai, to useEffect har baar execute hoga jab index ki value change hogi. 
useEffect(function(){
    getData()
  }, [index])

let printUserData 

if(isLoading){
  printUserData = <h3 className='text-2xl font-bold flex justify-center items-center w-full min-h-[80vh]'>
  Loading...
</h3>
}

//map function ka use hum array ke har element par ek function apply karne ke liye karte h aur ye ek naya array return karta h jisme har element par wo function apply hota h...like yaha hum userData array ke har element par ek function apply kar rahe h jisme hum har element ko ek div me wrap kar rahe h aur usme image aur author ka naam show kar rahe h...or ye naya array printUserData me store ho raha h...
else if(userData.length > 0){
  printUserData = userData.map(function(elem,idx){
    return <div key={idx}>
      < a href={elem.url} target="_blank">
      <img className="w-40 h-40 mr-2 rounded-md object-cover" src={elem.download_url} alt="img" />
      <h2 className="text-lg font-bold">{elem.author}</h2>
    </a>
    </div>
  })
}

  return (
    <div className='h-screen  overflow-auto bg-black text-white '>
      <div className='flex flex-wrap gap-4 ml-6 mt-4'>
        {printUserData}
      </div>
      <div className='flex justify-center items-center gap-6 p-4'>

      {/* Prev button ko tabhi enable karna chahiye jab index ki value 1 se badi ho, taki user pehle page par wapas na ja sake. Agar index ki value 1 hai, to Prev button disable ho jaye. */}
        <button onClick={() => index > 1 && setIndex(index - 1)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-pink-600'>Prev</button>

         <h4>Page{index}</h4>

      {/* Next button ko tabhi enable karna chahiye jab index ki value totalPages se chhoti ho, taki user aakhri page ke baad na ja sake. Agar index ki value totalPages ke barabar hai, to Next button disable ho jaye. */}
        <button onClick={() => setIndex(index + 1)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-pink-600'>Next</button>

      </div>

    </div>
  )
}

export default App
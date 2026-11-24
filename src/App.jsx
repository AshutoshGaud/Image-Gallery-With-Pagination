import React,{useEffect} from 'react'
import axios from 'axios'


const App = () => {

  const [index, setIndex] = React.useState(1)
  const totalPages = 100
  const [userData, setUserData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const getData = async () => {
    setIsLoading(true)
    setUserData([])
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=100`)
    setUserData(response.data)
    setIsLoading(false)
  }

 useEffect(function(){
    getData()
  }, [index])

let printUserData 

if(isLoading){
  printUserData = <h3 className='text-2xl font-bold flex justify-center items-center w-full min-h-[80vh]'>
  Loading...
</h3>
}

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

        <button onClick={() => index > 1 && setIndex(index - 1)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-pink-600'>Prev</button>

         <h4>Page{index}</h4>

        <button onClick={() => setIndex(index + 1)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-pink-600'>Next</button>

      </div>

    </div>
  )
}

export default App
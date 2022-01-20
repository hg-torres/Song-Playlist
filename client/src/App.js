import { useEffect, useState } from 'react'
import Form from './components/Form'
import SongCard from './components/SongCard'
import SongAPI from './utils/SongAPI'

const App = () => {

  const [songState, setSongState] = useState({
    title: '',
    artist: '',
    album: '',
    songs: []
  })

  const handleInputChange = ({ target: { name, value } }) => setSongState({ ...songState, [name]: value })

  const handleAddSong = event => {
    event.preventDefault()
    SongAPI.createSong({
      title: songState.title,
      artist: songState.artist,
      album: songState.album
    })
      .then(song => {
        console.log(song)
        const songs = JSON.parse(JSON.stringify(songState.songs))
        songs.push(song)
        setSongState({ ...songState, songs, title: '', artist: '', album: '' })
      })
  }

  useEffect(() => {
    SongAPI.getSongs()
      .then(songs => {
        console.log(songs)
        setSongState({ ...songState, songs })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="container">
      <div className="row bg-light p-5 rounded-lg m-3">
        <h1 className="display-4">Song App</h1>
        <p className="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex a inventore quis laboriosam, quae nihil. Veritatis, aut voluptatem! Minima consectetur, modi consequuntur qui neque expedita? Beatae omnis ipsa quos dolor.
        Corrupti dolor repellat non accusamus nostrum necessitatibus, dicta libero. Dolorum blanditiis incidunt similique nesciunt laudantium est maiores deleniti consequatur debitis ipsam, animi eligendi alias suscipit error, doloremque facilis! Quod, saepe?</p>
        <hr className="my-4" />
      </div>
      <div className="row">
        <div className="col-md-6">
          <h5>Add A Song</h5>
          <hr />
          <Form
            title={songState.title}
            artist={songState.artist}
            album={songState.album}
            handleInputChange={handleInputChange}
            handleAddSong={handleAddSong} />
        </div>
        <div className="col-md-6">
          <h5>Your Songs</h5>
          <hr />
          {
            songState.songs.map(song => <SongCard key={song._id} title={song.title} artist={song.artist} album={song.album} />)
          }
        </div>
      </div>
    </div>
  )
}

export default App

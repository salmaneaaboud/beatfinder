import "./ExploreBeats.css";
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import AudioPlayer from "/src/components/MusicPlayer/AudioPlayer";
import BeatItem from "/src/components/BeatItem/BeatItem";
import Sidebar from '/src/components/Sidebar/Sidebar';


function ExploreBeats() {
  return (
    <>
    <div style={{ display: "flex" }}>
      <Sidebar />
      
      <div style={{ flex: 1 }}>
      <LoggedHeader />
      <Container>
        <Row>
          <Col>
          <h2 className="welcome-text">¡Bienvenido, <span>Cliente</span>!</h2>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center gap-3">
          <CustomButton
            type="btn-light-grey"
            value="Beats"
          />

          <CustomButton
            type="btn-outline-light"
            value="Productores"
          />
          </Col>
        </Row>

        <Row className="py-5">
          <Col md={12} lg={12} xl={12} sm={12} className="d-flex gap-3">
        <div className="search-bar-explore">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Buscar por tags" />
        </div>

        <CustomButton
            type="btn-primary"
            value="Bizarrap"
          />
          
          <CustomButton
            type="btn-primary"
            value="Drake"
          />
        </Col>

        </Row>
        <Col className="d-flex gap-3">
        <CustomButton
            type="btn-outline-light"
            value="Filtrar"
          />
                  <CustomButton
            type="btn-outline-light"
            value="Genero"
          />
                  <CustomButton
            type="btn-outline-light"
            value="Clave"
          />
                  <CustomButton
            type="btn-outline-light"
            value="BPM"
          />
          
        </Col>
        <Row className="gx-3 gy-4">
  <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
    <BeatItem
      image='https://m.media-amazon.com/images/I/61wOKyMm-oL._UXNaN_FMjpg_QL85_.jpg'
      title='Bizarrap Session Vol. 52'
      price='69.99'
      audiourl='./src/assets/resources/song1.mp3'
    />
  </Col>
  <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
    <BeatItem
      image='https://i.scdn.co/image/ab67616d0000b273ddeb26b576ba7fc6fb59fa06'
      title='Too Many Nights - Saltman'
      price='74.99'
      audiourl='./src/assets/resources/song2.mp3'
    />
  </Col>
  <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
    <BeatItem
      image='https://www.lahiguera.net/musicalia/artistas/bad_bunny/disco/10439/bad_bunny_yhlqmdlg-portada.jpg'
      title='YHLQMDLG - Bad Bunny'
      price='89.99'
      audiourl='./src/assets/resources/song3.mp3'
    />
  </Col>
  <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
    <BeatItem
      image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONuwg67SzmgNtnfEVkQPhkGLKg7ZwEVlY6Q&s'
      title='Mañana Será Bonito - Karol G'
      price='99.99'
      audiourl='./src/assets/resources/song5.mp3'
    />
  </Col>
  <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
    <BeatItem
      image='https://www.lahiguera.net/musicalia/artistas/kendrick_lamar/disco/13906/kendrick_lamar_gnx-portada.jpg'
      title='Kendrick Lamar - GNX'
      price='84.99'
      audiourl='./src/assets/resources/song6.mp3'
    />
  </Col>
  <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
    <BeatItem
      image='https://m.media-amazon.com/images/I/51v8sgzE1iL._UXNaN_FMjpg_QL85_.jpg'
      title='Vice Versa - Rauw Alejandro'
      price='79.99'
      audiourl='./src/assets/resources/song7.mp3'
    />
  </Col>
  <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
    <BeatItem
      image='https://m.media-amazon.com/images/I/61T9dy+3JiL._UF1000,1000_QL80_.jpg'
      title='The Death of Slim Shady'
      price='69.99'
      audiourl='./src/assets/resources/song8.mp3'
    />
  </Col>
  <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
    <BeatItem
      image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR79FGDdMqu_wBLzTfqj2s82TpjsIbfptAd7w&s'
      title='Nothing but the beat'
      price='69.99'
      audiourl='./src/assets/resources/song8.mp3'
    />
  </Col>
</Row>    
</Container>

      </div>
      </div>
      <AudioPlayer 
        trackTitle = "Runaway"
        artist = "Kanye West"
        audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        coverImage = "https://images-na.ssl-images-amazon.com/images/I/61xeA8OWEbL._AC_UL210_SR210,210_.jpg"
      />
    </>

  );
};

export default ExploreBeats;

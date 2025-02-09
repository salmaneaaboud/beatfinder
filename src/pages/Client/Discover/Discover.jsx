import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { useGetSongByGenreQuery } from '/src/redux/services/shazamCore';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ReactPaginate from 'react-paginate';
import { FaFilter, FaEye } from "react-icons/fa";

const Discover = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const { data, isFetching, error } = useGetSongByGenreQuery();

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedBpm, setSelectedBpm] = useState([60, 200]);
    const [selectedKey, setSelectedKey] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([0, 1000]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const songsPerPage = 8;

    const filteredSongs = (data || []).filter(song => {
        const matchesSearch = searchTerm ? song.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesGenre = selectedGenres.length ? selectedGenres.includes(song.genre) : true;
        const matchesBpm = song.bpm >= selectedBpm[0] && song.bpm <= selectedBpm[1];
        const matchesKey = selectedKey.length ? selectedKey.includes(song.key) : true;
        const matchesPrice = song.price >= selectedPrice[0] && song.price <= selectedPrice[1];

        return matchesSearch && matchesGenre && matchesBpm && matchesKey && matchesPrice;
    });

    const handleGenreFilter = (genre) => {
        setSelectedGenres(selectedGenres.includes(genre) ? selectedGenres.filter((g) => g !== genre) : [...selectedGenres, genre]);
    };

    const handleKeyFilter = (key) => {
        setSelectedKey(selectedKey.includes(key) ? selectedKey.filter(k => k !== key) : [...selectedKey, key]);
    };

    const uniqueGenres = [...new Set(data?.map(song => song.genre))];

    const indexOfLastSong = (currentPage + 1) * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

    useEffect(() => {
        setCurrentPage(0); 
    }, [selectedGenres, selectedBpm, selectedKey, selectedPrice, searchTerm]);
    

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    if (error) return <Error />;

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <LoggedHeader />
                {isFetching ? (
                    <Loader title="Cargando canciones..." />
                ) : (
                    <div className="d-flex flex-column mx-auto" style={{ width: "90%" }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <button
                                onClick={() => setFiltersVisible(!filtersVisible)}
                                className="btn btn-transparent"
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "20px",
                                    backgroundColor: "transparent",
                                    color: "white",
                                    border: "2px solid white",
                                    display: "flex",
                                    alignItems: "center",
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                {filtersVisible ? (
                                    <FaEye style={{ marginRight: "8px" }} />
                                ) : (
                                    <FaFilter style={{ marginRight: "8px" }} />
                                )}
                                {filtersVisible ? "Ocultar filtros" : "Mostrar filtros"}
                            </button>
                        </div>

                        <div
                            className={`filter-section d-flex flex-column align-items-center mb-4 ${
                                filtersVisible ? "visible" : "hidden"
                            }`}
                            style={{
                                maxHeight: filtersVisible ? "800px" : "0",
                                opacity: filtersVisible ? 1 : 0,
                                overflow: "hidden",
                                transition: "max-height 0.5s ease, opacity 0.5s ease",
                            }}
                        >
                            <div className="genre-filters gap-3 d-flex flex-wrap justify-content-center align-items-center mb-4 text-white">
                                <span>Género: </span>
                                <div>
                                    {uniqueGenres.map((genre) => (
                                        <button
                                            key={genre}
                                            onClick={() => handleGenreFilter(genre)}
                                            className={`genre-button ${selectedGenres.includes(genre) ? "active" : ""}`}
                                            style={{
                                                padding: "10px 20px",
                                                margin: "5px",
                                                border: "none",
                                                borderRadius: "20px",
                                                backgroundColor: selectedGenres.includes(genre) ? "#8C52FF" : "#f0f0f0",
                                                color: selectedGenres.includes(genre) ? "#fff" : "#000",
                                                cursor: "pointer",
                                                transition: "background-color 0.3s",
                                            }}
                                        >
                                            {genre}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="d-flex flex-column align-items-center mb-3 text-white">
                                <span>BPM: {selectedBpm[0]} - {selectedBpm[1]}</span>
                                <Slider
                                    range
                                    min={60}
                                    max={200}
                                    value={selectedBpm}
                                    onChange={setSelectedBpm}
                                    trackStyle={[{ backgroundColor: '#8C52FF' }]}
                                    handleStyle={[{ borderColor: '#8C52FF' }, { borderColor: '#8C52FF' }]}
                                    railStyle={{ backgroundColor: '#ccc' }}
                                    style={{ width: "80%" }}
                                />
                            </div>
                            <div className="d-flex flex-wrap justify-content-center mb-3 text-white">
                                <span>Tonalidad:</span>
                                {["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].map(key => (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyFilter(key)}
                                        className={`key-button ${selectedKey.includes(key) ? "active" : ""}`}
                                        style={{
                                            padding: "5px 10px",
                                            margin: "5px",
                                            border: "none",
                                            borderRadius: "10px",
                                            backgroundColor: selectedKey.includes(key) ? "#FF5733" : "#f0f0f0",
                                            color: selectedKey.includes(key) ? "#fff" : "#000",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s",
                                        }}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>
                            <div className="d-flex flex-column align-items-center text-white">
                                <span>Precio: {selectedPrice[0]}€ - {selectedPrice[1]}€</span>
                                <Slider
                                    range
                                    min={0}
                                    max={1000}
                                    value={selectedPrice}
                                    onChange={setSelectedPrice}
                                    trackStyle={[{ backgroundColor: '#FF5733' }]}
                                    handleStyle={[{ borderColor: '#FF5733' }, { borderColor: '#FF5733' }]}
                                    railStyle={{ backgroundColor: '#ccc' }}
                                    style={{ width: "80%" }}
                                />
                            </div>
                        </div>

                        <div className="d-flex flex-wrap justify-flex-start gap-4 mb-4">
                            {currentSongs?.map((song, i) => (
                                <SongCard
                                    key={song.id}
                                    song={song}
                                    isPlaying={isPlaying}
                                    activeSong={activeSong}
                                    data={filteredSongs}
                                    i={i}
                                />
                            ))}
                        </div>
                        <div className="d-flex justify-content-center">
                            <ReactPaginate
                                previousLabel={"← Anterior"}
                                nextLabel={"Siguiente →"}
                                pageCount={Math.ceil(filteredSongs.length / songsPerPage)}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                activeClassName={"active"}
                                disabledClassName={"disabled"}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;

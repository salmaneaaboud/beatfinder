import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { useGetSongByGenreQuery } from '/src/redux/services/shazamCore';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Discover = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const { data, isFetching, error } = useGetSongByGenreQuery();

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedBpm, setSelectedBpm] = useState(120);
    const [selectedKey, setSelectedKey] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(50);

    const filteredSongs = (data || []).filter(song => {
        const matchesSearch = searchTerm ? song.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesGenre = selectedGenres.length ? selectedGenres.includes(song.genre) : true;
        const matchesBpm = Math.abs(song.bpm - selectedBpm) <= 20;
        const matchesKey = selectedKey.length ? selectedKey.includes(song.key) : true;
        const matchesPrice = song.price <= selectedPrice;

        return matchesSearch && matchesGenre && matchesBpm && matchesKey && matchesPrice;
    });

    const handleGenreFilter = (genre) => {
        setSelectedGenres(selectedGenres.includes(genre) ? selectedGenres.filter((g) => g !== genre) : [...selectedGenres, genre]);
    };

    const handleKeyFilter = (key) => {
        setSelectedKey(selectedKey.includes(key) ? selectedKey.filter(k => k !== key) : [...selectedKey, key]);
    };

    const uniqueGenres = [...new Set(data?.map(song => song.genre))];

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
                        <div className="genre-filters d-flex flex-wrap justify-content-center mb-4">
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
                        <div className="filter-section d-flex flex-column align-items-center mb-4">
                            <div className="d-flex flex-column align-items-center mb-3 text-white">
                                <span>BPM: {selectedBpm}</span>
                                <input
                                    type="range"
                                    min="60"
                                    max="200"
                                    value={selectedBpm}
                                    onChange={(e) => setSelectedBpm(parseInt(e.target.value))}
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
                                <span>Precio: ${selectedPrice}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={selectedPrice}
                                    onChange={(e) => setSelectedPrice(parseInt(e.target.value))}
                                    style={{ width: "80%" }}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-flex-start gap-4">
                            {filteredSongs?.map((song, i) => (
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;

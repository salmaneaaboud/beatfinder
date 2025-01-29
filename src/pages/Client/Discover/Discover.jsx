import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";

import { useGetSongByGenreQuery, useGetTopChartsQuery } from '/src/redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';

const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

    const { data, isFetching, error } = useGetSongByGenreQuery(genreListId || "POP");

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
                        <div className="d-flex flex-wrap justify-content-around gap-4 ">
                            {data?.map((song, i) => (
                                <SongCard
                                    key={song.key}
                                    song={song}
                                    isPlaying={isPlaying}
                                    activeSong={activeSong}
                                    data={data}
                                    i={i}
                                />
                            ))}
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default Discover;

export const filterSongsBySearchAndGenre = (songs, searchTerm, selectedGenres) => {
    const songsFilteredBySearch = songs.filter(
        (song) =>
            song?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song?.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const songsFilteredByGenre = selectedGenres.length > 0
        ? songsFilteredBySearch.filter((song) => selectedGenres.includes(song.genre))
        : songsFilteredBySearch;

    return songsFilteredByGenre;
};
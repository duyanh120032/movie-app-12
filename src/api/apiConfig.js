const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '8c665dbe7cb14b76e2f515958c345bdf',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;
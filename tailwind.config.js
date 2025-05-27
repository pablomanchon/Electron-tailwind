module.exports = {
  content: [
    './src/renderer/**/*.{html,js,ts,jsx,tsx}',  // Asegúrate de incluir todos los archivos relevantes
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
      },
    },
    plugins: [],
  }
}

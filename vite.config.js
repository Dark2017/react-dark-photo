const path = require('path')
module.exports = {
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'packages/index.js'),
      name: 'react-dark-photo'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          ReactDOM: 'react-dom'
        }
      }
    }
  },
  server: {
    port: 8080,
    // open: true
  }
}

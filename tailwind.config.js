module.exports = {
  content: [
    './frontend/apps/**/*.{js,ts,jsx,tsx}',
    './libs/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#10B981',
          50: '#f0fbf6',
          100: '#dff7ec',
          200: '#bff0d7',
          300: '#9fe8be',
          400: '#7fe1a5',
          500: '#10B981',
          600: '#0e8f67',
          700: '#0a6b4a',
          800: '#064830',
          900: '#032b1a'
        },
        accent: '#0ea5a4',
        surface: '#ffffff',
        muted: '#6b7280'
      }
    },
  },
  plugins: [],
}

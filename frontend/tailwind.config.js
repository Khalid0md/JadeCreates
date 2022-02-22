module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans2': ['Helvetica', 'Arial', 'sans-serif'],
      'sans3': ['Euclidcirculara webfont', 'Arial', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    extend: {
      colors: {
        background: '#F3F3F4',
        secondaryGray: '#9ca3af',
        mainBlack: '#040404',
        green2: '#49BEAA',
        green1: '#49DCB1',
        accentGray: '#E6E6E6',
      }
    },
  },
  plugins: [],
}


/*


colors: {
        background: '#F3F3F4',
        background2: '#D7D9CE',
        secondaryGray: '#9ca3af',
        mainBlack: '#040404',
        mainGreen: '#13505B',
        secondGreen: '#0C7489',
        thirdGreen: '#119DA4',
        mainOne: '#49BEAA',
        mainTwo: '#49DCB1',
        mainThree: '#456990',
      }


*/


//#9ca3af
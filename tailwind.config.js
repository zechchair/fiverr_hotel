// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


module.exports = {
	purge: false,
  content: ["./pages/**/*.{html,js,ts,tsx,jsx}","./components/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    screens: {
			"2xs": "400px",
			xs: "480px",
			sm: "640px",

			md: "768px",

			lg: "1024px",

			xl: "1280px",

			"2xl": "1536px",
		},
   
    extend: { screens: {
      print: { raw: "print" },
    },
    extend: {
      display: ["group-hover"],
    },
    minWidth: {
      "1/12": "8.3%",
      "2/12": "16.6%",
      "3/12": "25%",
      "4/12": "33.3%",
      "5/12": "41.6%",
      "6/12": "50%",
      "7/12": "58.3%",
      "8/12": "66.6%",
      "9/12": "75%",
      "10/12": "83.3%",
      "11/12": "91.6%",
    },
    fontSize: {
      "3xs": ".55rem",
      "2xs": ".65rem",
    },
    colors:{'cPink':"#ffe6cc","cPink2":"#ffb3c7","cFont":"#0e0e0f","cPink3":"#fc97b2"},},
  },
  plugins: [],
}
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["pages/dashboard"],{

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fdashboard&absolutePagePath=%2FUsers%2Fjoshkokatnur%2FDesktop%2FMartazo%2Ffrontend%2Fpages%2Fdashboard.js!":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fdashboard&absolutePagePath=%2FUsers%2Fjoshkokatnur%2FDesktop%2FMartazo%2Ffrontend%2Fpages%2Fdashboard.js! ***!
  \****************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\n    (window.__NEXT_P = window.__NEXT_P || []).push([\n      \"/dashboard\",\n      function () {\n        return __webpack_require__(/*! ./pages/dashboard.js */ \"./pages/dashboard.js\");\n      }\n    ]);\n    if(true) {\n      module.hot.dispose(function () {\n        window.__NEXT_P.push([\"/dashboard\"])\n      });\n    }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWNsaWVudC1wYWdlcy1sb2FkZXIuanM/cGFnZT0lMkZkYXNoYm9hcmQmYWJzb2x1dGVQYWdlUGF0aD0lMkZVc2VycyUyRmpvc2hrb2thdG51ciUyRkRlc2t0b3AlMkZNYXJ0YXpvJTJGZnJvbnRlbmQlMkZwYWdlcyUyRmRhc2hib2FyZC5qcyEuanMiLCJtYXBwaW5ncyI6IjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxrREFBc0I7QUFDN0M7QUFDQTtBQUNBLE9BQU8sSUFBVTtBQUNqQixNQUFNLFVBQVU7QUFDaEI7QUFDQSxPQUFPO0FBQ1A7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvP2FlZTkiXSwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgKHdpbmRvdy5fX05FWFRfUCA9IHdpbmRvdy5fX05FWFRfUCB8fCBbXSkucHVzaChbXG4gICAgICBcIi9kYXNoYm9hcmRcIixcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoXCIuL3BhZ2VzL2Rhc2hib2FyZC5qc1wiKTtcbiAgICAgIH1cbiAgICBdKTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuX19ORVhUX1AucHVzaChbXCIvZGFzaGJvYXJkXCJdKVxuICAgICAgfSk7XG4gICAgfVxuICAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fdashboard&absolutePagePath=%2FUsers%2Fjoshkokatnur%2FDesktop%2FMartazo%2Ffrontend%2Fpages%2Fdashboard.js!\n");

/***/ }),

/***/ "./components/NavButton.js":
/*!*********************************!*\
  !*** ./components/NavButton.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ NavButton; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nvar _s = $RefreshSig$();\nfunction NavButton(param) {\n    var text = param.text, bgColor = param.bgColor, textColor = param.textColor, shadow = param.shadow, link = param.link, onClick = param.onClick;\n    _s();\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        className: \"flex items-center justify-center px-8 h-14 rounded-2xl flex-shrink-0\" + \" shadow-\" + shadow + \" bg-\" + bgColor,\n        onClick: function() {\n            if (onClick) {\n                onClick();\n            } else {\n                router.push(link);\n            }\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n            className: \"font-bold nunito-font whitespace-nowrap\" + \" text-\" + textColor,\n            children: text\n        }, void 0, false, {\n            fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/components/NavButton.js\",\n            lineNumber: 17,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/components/NavButton.js\",\n        lineNumber: 8,\n        columnNumber: 9\n    }, this));\n};\n_s(NavButton, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = NavButton;\nvar _c;\n$RefreshReg$(_c, \"NavButton\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL05hdkJ1dHRvbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXVDOztBQUV4QixRQUFRLENBQUNDLFNBQVMsQ0FBQyxLQUFtRCxFQUFFLENBQUM7UUFBcERDLElBQUksR0FBTixLQUFtRCxDQUFqREEsSUFBSSxFQUFFQyxPQUFPLEdBQWYsS0FBbUQsQ0FBM0NBLE9BQU8sRUFBRUMsU0FBUyxHQUExQixLQUFtRCxDQUFsQ0EsU0FBUyxFQUFFQyxNQUFNLEdBQWxDLEtBQW1ELENBQXZCQSxNQUFNLEVBQUVDLElBQUksR0FBeEMsS0FBbUQsQ0FBZkEsSUFBSSxFQUFFQyxPQUFPLEdBQWpELEtBQW1ELENBQVRBLE9BQU87O0lBRS9FLEdBQUssQ0FBQ0MsTUFBTSxHQUFHUixzREFBUztJQUV4QixNQUFNLDZFQUNEUyxDQUFNO1FBQUNDLFNBQVMsRUFBRSxDQUFzRSx3RUFBRyxDQUFVLFlBQUdMLE1BQU0sR0FBRyxDQUFNLFFBQUdGLE9BQU87UUFDOUhJLE9BQU8sRUFBRSxRQUNyQixHQUQyQixDQUFDO1lBQ1osRUFBRSxFQUFFQSxPQUFPLEVBQUUsQ0FBQztnQkFDVkEsT0FBTztZQUNYLENBQUMsTUFBTSxDQUFDO2dCQUNKQyxNQUFNLENBQUNHLElBQUksQ0FBQ0wsSUFBSTtZQUNwQixDQUFDO1FBQ0wsQ0FBQzs4RkFFQU0sQ0FBQztZQUFDRixTQUFTLEVBQUUsQ0FBeUMsMkNBQUcsQ0FBUSxVQUFHTixTQUFTO3NCQUN6RUYsSUFBSTs7Ozs7Ozs7Ozs7QUFJckIsQ0FBQztHQW5CdUJELFNBQVM7O1FBRWRELGtEQUFTOzs7S0FGSkMsU0FBUyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL05hdkJ1dHRvbi5qcz8yODU1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdkJ1dHRvbih7IHRleHQsIGJnQ29sb3IsIHRleHRDb2xvciwgc2hhZG93LCBsaW5rLCBvbkNsaWNrIH0pIHtcblxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtOCBoLTE0IHJvdW5kZWQtMnhsIGZsZXgtc2hyaW5rLTBcIiArIFwiIHNoYWRvdy1cIiArIHNoYWRvdyArIFwiIGJnLVwiICsgYmdDb2xvcn1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob25DbGljaykge1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrKClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXIucHVzaChsaW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fT5cblxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtcImZvbnQtYm9sZCBudW5pdG8tZm9udCB3aGl0ZXNwYWNlLW5vd3JhcFwiICsgXCIgdGV4dC1cIiArIHRleHRDb2xvcn0gPlxuICAgICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICApXG59Il0sIm5hbWVzIjpbInVzZVJvdXRlciIsIk5hdkJ1dHRvbiIsInRleHQiLCJiZ0NvbG9yIiwidGV4dENvbG9yIiwic2hhZG93IiwibGluayIsIm9uQ2xpY2siLCJyb3V0ZXIiLCJidXR0b24iLCJjbGFzc05hbWUiLCJwdXNoIiwicCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/NavButton.js\n");

/***/ }),

/***/ "./components/logo.js":
/*!****************************!*\
  !*** ./components/logo.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Logo; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nvar _s = $RefreshSig$();\nfunction Logo() {\n    _s();\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        className: \"flex items-center justify-center\",\n        onClick: function() {\n            router.push('/');\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"text-3xl nunito-font font-black text-mainBlack\",\n                children: \"Mar\"\n            }, void 0, false, {\n                fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/components/logo.js\",\n                lineNumber: 13,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"bg-clip-text bg-gradient-to-l from-green1 to-green2 text-transparent text-3xl nunito-font font-black glow-main-xs\",\n                children: \"tazo\"\n            }, void 0, false, {\n                fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/components/logo.js\",\n                lineNumber: 16,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/components/logo.js\",\n        lineNumber: 8,\n        columnNumber: 9\n    }, this));\n};\n_s(Logo, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = Logo;\nvar _c;\n$RefreshReg$(_c, \"Logo\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2xvZ28uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF1Qzs7QUFFeEIsUUFBUSxDQUFDQyxJQUFJLEdBQUcsQ0FBQzs7SUFFNUIsR0FBSyxDQUFDQyxNQUFNLEdBQUdGLHNEQUFTO0lBRXhCLE1BQU0sNkVBQ0RHLENBQU07UUFBQ0MsU0FBUyxFQUFDLENBQWtDO1FBQ2hEQyxPQUFPLEVBQUUsUUFDckIsR0FEMkIsQ0FBQztZQUNaSCxNQUFNLENBQUNJLElBQUksQ0FBQyxDQUFHO1FBQ25CLENBQUM7O3dGQUVBQyxDQUFDO2dCQUFDSCxTQUFTLEVBQUMsQ0FBZ0Q7MEJBQUUsQ0FFL0Q7Ozs7Ozt3RkFDQ0csQ0FBQztnQkFBQ0gsU0FBUyxFQUFDLENBQW1IOzBCQUFFLENBRWxJOzs7Ozs7Ozs7Ozs7QUFHWixDQUFDO0dBbEJ1QkgsSUFBSTs7UUFFVEQsa0RBQVM7OztLQUZKQyxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvbG9nby5qcz9hNjY0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExvZ28oKSB7XG5cbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvJyk7XG4gICAgICAgICAgICB9fT5cblxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC0zeGwgbnVuaXRvLWZvbnQgZm9udC1ibGFjayB0ZXh0LW1haW5CbGFja1wiID5cbiAgICAgICAgICAgICAgICBNYXJcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImJnLWNsaXAtdGV4dCBiZy1ncmFkaWVudC10by1sIGZyb20tZ3JlZW4xIHRvLWdyZWVuMiB0ZXh0LXRyYW5zcGFyZW50IHRleHQtM3hsIG51bml0by1mb250IGZvbnQtYmxhY2sgZ2xvdy1tYWluLXhzXCIgPlxuICAgICAgICAgICAgICAgIHRhem9cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9idXR0b24+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJ1c2VSb3V0ZXIiLCJMb2dvIiwicm91dGVyIiwiYnV0dG9uIiwiY2xhc3NOYW1lIiwib25DbGljayIsInB1c2giLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/logo.js\n");

/***/ }),

/***/ "./pages/dashboard.js":
/*!****************************!*\
  !*** ./pages/dashboard.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ DashboardLoginHandler; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_WalletSessionProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/WalletSessionProvider */ \"./utils/WalletSessionProvider.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_logo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/logo */ \"./components/logo.js\");\n/* harmony import */ var _components_NavButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/NavButton */ \"./components/NavButton.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\nfunction DashboardLoginHandler() {\n    _s();\n    var walletSession = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_utils_WalletSessionProvider__WEBPACK_IMPORTED_MODULE_1__.WalletContext);\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        if (!walletSession.isLoaded) {\n            return;\n        }\n        if (walletSession.walletAddress) {\n            router.push('/dashboard');\n        } else {\n            router.push('/');\n        }\n    }, [\n        walletSession.walletAddress\n    ]);\n    if (walletSession.walletAddress) {\n        return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Dashboard, {}, void 0, false, {\n            fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n            lineNumber: 25,\n            columnNumber: 13\n        }, this));\n    } else {\n        return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading . . .\"\n        }, void 0, false, {\n            fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n            lineNumber: 29,\n            columnNumber: 13\n        }, this));\n    }\n};\n_s(DashboardLoginHandler, \"kYIFOT3WU0PsiPx7dHtf9PHIzlw=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = DashboardLoginHandler;\nfunction Dashboard() {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex w-full justify-center bg-background h-screen\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full max-w-[90rem] bg-background px-14\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DashboardNavBar, {}, void 0, false, {\n                    fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n                    lineNumber: 40,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"nunito-font font-black text-4xl\",\n                    children: \"Dashboard\"\n                }, void 0, false, {\n                    fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n                    lineNumber: 41,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n            lineNumber: 39,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n        lineNumber: 38,\n        columnNumber: 9\n    }, this));\n}\n_c1 = Dashboard;\nfunction DashboardNavBar() {\n    _s1();\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex grow my-14 h-14 space-x-4 flex-shrink-0\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_logo__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n                lineNumber: 55,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex grow\"\n            }, void 0, false, {\n                fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n                lineNumber: 56,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_NavButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                text: 'Landing Page',\n                bgColor: 'white',\n                textColor: 'mainBlack',\n                link: '/'\n            }, void 0, false, {\n                fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n                lineNumber: 57,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_NavButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                text: 'Get Started',\n                bgColor: 'mainBlack',\n                textColor: 'white',\n                shadow: 'high',\n                link: '/getstarted'\n            }, void 0, false, {\n                fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n                lineNumber: 58,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n        lineNumber: 54,\n        columnNumber: 9\n    }, this));\n}\n_s1(DashboardNavBar, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c2 = DashboardNavBar;\nfunction EditStoreMetadata() {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/pages/dashboard.js\",\n        lineNumber: 65,\n        columnNumber: 9\n    }, this));\n}\n_c3 = EditStoreMetadata;\nvar _c, _c1, _c2, _c3;\n$RefreshReg$(_c, \"DashboardLoginHandler\");\n$RefreshReg$(_c1, \"Dashboard\");\n$RefreshReg$(_c2, \"DashboardNavBar\");\n$RefreshReg$(_c3, \"EditStoreMetadata\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9kYXNoYm9hcmQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQzhEO0FBQ2pCO0FBQ047QUFDRjtBQUNVOztBQUVoQyxRQUFRLENBQUNNLHFCQUFxQixHQUFHLENBQUM7O0lBRTdDLEdBQUssQ0FBQ0MsYUFBYSxHQUFHTCxpREFBVSxDQUFDRix1RUFBYTtJQUM5QyxHQUFLLENBQUNRLE1BQU0sR0FBR0wsc0RBQVM7SUFFeEJGLGdEQUFTLENBQUMsUUFDZCxHQURvQixDQUFDO1FBQ2IsRUFBRSxHQUFHTSxhQUFhLENBQUNFLFFBQVEsRUFBRSxDQUFDO1lBQUMsTUFBTTtRQUFDLENBQUM7UUFFdkMsRUFBRSxFQUFFRixhQUFhLENBQUNHLGFBQWEsRUFBRSxDQUFDO1lBQzlCRixNQUFNLENBQUNHLElBQUksQ0FBQyxDQUFZO1FBQzVCLENBQUMsTUFBTSxDQUFDO1lBQ0pILE1BQU0sQ0FBQ0csSUFBSSxDQUFDLENBQUc7UUFDbkIsQ0FBQztJQUNMLENBQUMsRUFBRSxDQUFDSjtRQUFBQSxhQUFhLENBQUNHLGFBQWE7SUFBQSxDQUFDO0lBRWhDLEVBQUUsRUFBRUgsYUFBYSxDQUFDRyxhQUFhLEVBQUUsQ0FBQztRQUM5QixNQUFNLDZFQUNERSxTQUFTOzs7OztJQUVsQixDQUFDLE1BQU0sQ0FBQztRQUNKLE1BQU0sNkVBQ0RDLENBQUc7c0JBQUMsQ0FFTDs7Ozs7O0lBRVIsQ0FBQztBQUNMLENBQUM7R0ExQnVCUCxxQkFBcUI7O1FBRzFCSCxrREFBUzs7O0tBSEpHLHFCQUFxQjtTQTRCcENNLFNBQVMsR0FBRyxDQUFDO0lBQ2xCLE1BQU0sNkVBQ0RDLENBQUc7UUFBQ0MsU0FBUyxFQUFDLENBQW1EOzhGQUM3REQsQ0FBRztZQUFDQyxTQUFTLEVBQUMsQ0FBMEM7OzRGQUNwREMsZUFBZTs7Ozs7NEZBQ2ZDLENBQUM7b0JBQUNGLFNBQVMsRUFBQyxDQUFpQzs4QkFBQyxDQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJaEIsQ0FBQztNQVhRRixTQUFTO1NBYVRHLGVBQWUsR0FBRyxDQUFDOztJQUV4QixHQUFLLENBQUNQLE1BQU0sR0FBR0wsc0RBQVM7SUFFeEIsTUFBTSw2RUFDRFUsQ0FBRztRQUFDQyxTQUFTLEVBQUMsQ0FBOEM7O3dGQUN4RFYsd0RBQUk7Ozs7O3dGQUNKUyxDQUFHO2dCQUFDQyxTQUFTLEVBQUMsQ0FBVzs7Ozs7O3dGQUN6QlQsNkRBQVM7Z0JBQUNZLElBQUksRUFBRSxDQUFjO2dCQUFFQyxPQUFPLEVBQUUsQ0FBTztnQkFBRUMsU0FBUyxFQUFFLENBQVc7Z0JBQUVDLElBQUksRUFBRSxDQUFHOzs7Ozs7d0ZBQ25GZiw2REFBUztnQkFBQ1ksSUFBSSxFQUFFLENBQWE7Z0JBQUVDLE9BQU8sRUFBRSxDQUFXO2dCQUFFQyxTQUFTLEVBQUUsQ0FBTztnQkFBRUUsTUFBTSxFQUFFLENBQU07Z0JBQUVELElBQUksRUFBRSxDQUFhOzs7Ozs7Ozs7Ozs7QUFHekgsQ0FBQztJQVpRTCxlQUFlOztRQUVMWixrREFBUzs7O01BRm5CWSxlQUFlO1NBY2ZPLGlCQUFpQixHQUFHLENBQUM7SUFDMUIsTUFBTSw2RUFDRFQsQ0FBRzs7Ozs7QUFJWixDQUFDO01BTlFTLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9kYXNoYm9hcmQuanM/MGU1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFdhbGxldENvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvV2FsbGV0U2Vzc2lvblByb3ZpZGVyXCJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBMb2dvIGZyb20gXCIuLi9jb21wb25lbnRzL2xvZ29cIjtcbmltcG9ydCBOYXZCdXR0b24gZnJvbSBcIi4uL2NvbXBvbmVudHMvTmF2QnV0dG9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhc2hib2FyZExvZ2luSGFuZGxlcigpIHtcblxuICAgIGNvbnN0IHdhbGxldFNlc3Npb24gPSB1c2VDb250ZXh0KFdhbGxldENvbnRleHQpO1xuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCF3YWxsZXRTZXNzaW9uLmlzTG9hZGVkKSB7IHJldHVybiB9XG5cbiAgICAgICAgaWYgKHdhbGxldFNlc3Npb24ud2FsbGV0QWRkcmVzcykge1xuICAgICAgICAgICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm91dGVyLnB1c2goJy8nKVxuICAgICAgICB9XG4gICAgfSwgW3dhbGxldFNlc3Npb24ud2FsbGV0QWRkcmVzc10pXG5cbiAgICBpZiAod2FsbGV0U2Vzc2lvbi53YWxsZXRBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RGFzaGJvYXJkIC8+XG4gICAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICBMb2FkaW5nIC4gLiAuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gRGFzaGJvYXJkKCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCB3LWZ1bGwganVzdGlmeS1jZW50ZXIgYmctYmFja2dyb3VuZCBoLXNjcmVlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctWzkwcmVtXSBiZy1iYWNrZ3JvdW5kIHB4LTE0XCI+XG4gICAgICAgICAgICAgICAgPERhc2hib2FyZE5hdkJhciAvPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm51bml0by1mb250IGZvbnQtYmxhY2sgdGV4dC00eGxcIj5cbiAgICAgICAgICAgICAgICAgICAgRGFzaGJvYXJkXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cblxuZnVuY3Rpb24gRGFzaGJvYXJkTmF2QmFyKCkge1xuXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ3JvdyBteS0xNCBoLTE0IHNwYWNlLXgtNCBmbGV4LXNocmluay0wXCI+XG4gICAgICAgICAgICA8TG9nbyAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdyb3dcIiAvPlxuICAgICAgICAgICAgPE5hdkJ1dHRvbiB0ZXh0PXsnTGFuZGluZyBQYWdlJ30gYmdDb2xvcj17J3doaXRlJ30gdGV4dENvbG9yPXsnbWFpbkJsYWNrJ30gbGluaz17Jy8nfSAvPlxuICAgICAgICAgICAgPE5hdkJ1dHRvbiB0ZXh0PXsnR2V0IFN0YXJ0ZWQnfSBiZ0NvbG9yPXsnbWFpbkJsYWNrJ30gdGV4dENvbG9yPXsnd2hpdGUnfSBzaGFkb3c9eydoaWdoJ30gbGluaz17Jy9nZXRzdGFydGVkJ30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5mdW5jdGlvbiBFZGl0U3RvcmVNZXRhZGF0YSgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgIClcbn0iXSwibmFtZXMiOlsiV2FsbGV0Q29udGV4dCIsInVzZUVmZmVjdCIsInVzZUNvbnRleHQiLCJ1c2VSb3V0ZXIiLCJMb2dvIiwiTmF2QnV0dG9uIiwiRGFzaGJvYXJkTG9naW5IYW5kbGVyIiwid2FsbGV0U2Vzc2lvbiIsInJvdXRlciIsImlzTG9hZGVkIiwid2FsbGV0QWRkcmVzcyIsInB1c2giLCJEYXNoYm9hcmQiLCJkaXYiLCJjbGFzc05hbWUiLCJEYXNoYm9hcmROYXZCYXIiLCJwIiwidGV4dCIsImJnQ29sb3IiLCJ0ZXh0Q29sb3IiLCJsaW5rIiwic2hhZG93IiwiRWRpdFN0b3JlTWV0YWRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/dashboard.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["pages/_app","main"], function() { return __webpack_exec__("./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fdashboard&absolutePagePath=%2FUsers%2Fjoshkokatnur%2FDesktop%2FMartazo%2Ffrontend%2Fpages%2Fdashboard.js!"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);
"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./utils/ModalContext.js":
/*!*******************************!*\
  !*** ./utils/ModalContext.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useModal\": function() { return /* binding */ useModal; },\n/* harmony export */   \"default\": function() { return /* binding */ ModalProvider; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$();\n// create context\nvar ModalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction useModal() {\n    _s();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ModalContext);\n}\n_s(useModal, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nfunction ModalProvider(props) {\n    _s1();\n    // setup state for modal type\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true), isShown = ref[0], setIsShown = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(), content = ref1[0], setContent = ref1[1];\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ModalContext.Provider, {\n        value: {\n            isShown: isShown,\n            setIsShown: setIsShown,\n            setContent: setContent\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Modal, {\n                isShown: isShown,\n                setIsShown: setIsShown,\n                children: content\n            }, void 0, false, {\n                fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/utils/ModalContext.js\",\n                lineNumber: 21,\n                columnNumber: 13\n            }, this),\n            props.children\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/utils/ModalContext.js\",\n        lineNumber: 19,\n        columnNumber: 9\n    }, this));\n};\n_s1(ModalProvider, \"82tPL0w//b9jMGcgME7A6LJhbr0=\");\n_c = ModalProvider;\nfunction Modal(props) {\n    _s2();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), loaded = ref[0], setLoaded = ref[1];\n    //const [blur, setBlur] = useState(0)\n    /*\n    useEffect(() => {\n        if (props.isShown) {\n            setLoaded(true)\n        }\n    })\n    */ return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        onClick: function() {\n            props.setIsShown(false);\n        },\n        className: \"flex items-center justify-center absolute w-screen h-screen backdrop-blur-none z-50 transition-all duration-500 cursor-default \" + (props.isShown ? \"backdrop-blur-[4px] bg-gray-500/30\" : \"backdrop-blur-none bg-transparent invisible\"),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"bg-white p-4 rounded-2xl shadow-high \" + (!props.isShown && \"invisible\"),\n            children: props.children\n        }, void 0, false, {\n            fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/utils/ModalContext.js\",\n            lineNumber: 45,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/joshkokatnur/Desktop/Martazo/frontend/utils/ModalContext.js\",\n        lineNumber: 44,\n        columnNumber: 9\n    }, this));\n}\n_s2(Modal, \"Hdw5EO+DplCNBEJcNuH8tsP7WZ4=\");\n_c1 = Modal;\nvar _c, _c1;\n$RefreshReg$(_c, \"ModalProvider\");\n$RefreshReg$(_c1, \"Modal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9Nb2RhbENvbnRleHQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUE0RDtBQUM1QjtBQUNROztBQUV4QyxFQUFpQjtBQUNqQixHQUFLLENBQUNLLFlBQVksaUJBQUdMLG9EQUFhO0FBRTNCLFNBQVNNLFFBQVEsR0FBRyxDQUFDOztJQUN4QixNQUFNLENBQUNMLGlEQUFVLENBQUNJLFlBQVk7QUFDbEMsQ0FBQztHQUZlQyxRQUFRO0FBSVQsUUFBUSxDQUFDQyxhQUFhLENBQUNDLEtBQUssRUFBRSxDQUFDOztJQUUxQyxFQUE2QjtJQUM3QixHQUFLLENBQXlCTCxHQUFjLEdBQWRBLCtDQUFRLENBQUMsSUFBSSxHQUFwQ00sT0FBTyxHQUFnQk4sR0FBYyxLQUE1Qk8sVUFBVSxHQUFJUCxHQUFjO0lBQzVDLEdBQUssQ0FBeUJBLElBQVUsR0FBVkEsK0NBQVEsSUFBL0JRLE9BQU8sR0FBZ0JSLElBQVUsS0FBeEJTLFVBQVUsR0FBSVQsSUFBVTtJQUV4QyxNQUFNLDZFQUNERSxZQUFZLENBQUNRLFFBQVE7UUFBQ0MsS0FBSyxFQUFFLENBQUM7WUFBQ0wsT0FBTyxFQUFQQSxPQUFPO1lBQUVDLFVBQVUsRUFBVkEsVUFBVTtZQUFFRSxVQUFVLEVBQVZBLFVBQVU7UUFBQyxDQUFDOzt3RkFFNURHLEtBQUs7Z0JBQUNOLE9BQU8sRUFBRUEsT0FBTztnQkFBRUMsVUFBVSxFQUFFQSxVQUFVOzBCQUMxQ0MsT0FBTzs7Ozs7O1lBR1hILEtBQUssQ0FBQ1EsUUFBUTs7Ozs7OztBQUczQixDQUFDO0lBaEJ1QlQsYUFBYTtLQUFiQSxhQUFhO1NBa0I1QlEsS0FBSyxDQUFDUCxLQUFLLEVBQUUsQ0FBQzs7SUFFbkIsR0FBSyxDQUF1QkwsR0FBZSxHQUFmQSwrQ0FBUSxDQUFDLEtBQUssR0FBbkNjLE1BQU0sR0FBZWQsR0FBZSxLQUE1QmUsU0FBUyxHQUFJZixHQUFlO0lBQzNDLEVBQXFDO0lBRXJDLEVBTUU7Ozs7OztJQUFBLEdBRUYsTUFBTSw2RUFDRGdCLENBQU07UUFBQ0MsT0FBTyxFQUFFLFFBQVFaLEdBQUYsQ0FBQztZQUFDQSxLQUFLLENBQUNFLFVBQVUsQ0FBQyxLQUFLO1FBQUUsQ0FBQztRQUFFVyxTQUFTLEVBQUUsQ0FBaUksb0lBQUliLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLENBQW9DLHNDQUFHLENBQTZDOzhGQUNuU2EsQ0FBRztZQUFDRCxTQUFTLEVBQUUsQ0FBdUMsMkNBQUtiLEtBQUssQ0FBQ0MsT0FBTyxJQUFJLENBQVc7c0JBQ25GRCxLQUFLLENBQUNRLFFBQVE7Ozs7Ozs7Ozs7O0FBSS9CLENBQUM7SUFwQlFELEtBQUs7TUFBTEEsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi91dGlscy9Nb2RhbENvbnRleHQuanM/MTUwNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcblxuLy8gY3JlYXRlIGNvbnRleHRcbmNvbnN0IE1vZGFsQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlTW9kYWwoKSB7XG4gICAgcmV0dXJuIHVzZUNvbnRleHQoTW9kYWxDb250ZXh0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNb2RhbFByb3ZpZGVyKHByb3BzKSB7XG5cbiAgICAvLyBzZXR1cCBzdGF0ZSBmb3IgbW9kYWwgdHlwZVxuICAgIGNvbnN0IFtpc1Nob3duLCBzZXRJc1Nob3duXSA9IHVzZVN0YXRlKHRydWUpXG4gICAgY29uc3QgW2NvbnRlbnQsIHNldENvbnRlbnRdID0gdXNlU3RhdGUoKVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPE1vZGFsQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBpc1Nob3duLCBzZXRJc1Nob3duLCBzZXRDb250ZW50IH19PlxuXG4gICAgICAgICAgICA8TW9kYWwgaXNTaG93bj17aXNTaG93bn0gc2V0SXNTaG93bj17c2V0SXNTaG93bn0gPlxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgPC9Nb2RhbD5cblxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L01vZGFsQ29udGV4dC5Qcm92aWRlcj4gXG4gICAgKVxufVxuXG5mdW5jdGlvbiBNb2RhbChwcm9wcykge1xuXG4gICAgY29uc3QgW2xvYWRlZCwgc2V0TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAgIC8vY29uc3QgW2JsdXIsIHNldEJsdXJdID0gdXNlU3RhdGUoMClcblxuICAgIC8qXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLmlzU2hvd24pIHtcbiAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICAqL1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7IHByb3BzLnNldElzU2hvd24oZmFsc2UpIH19IGNsYXNzTmFtZT17XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBhYnNvbHV0ZSB3LXNjcmVlbiBoLXNjcmVlbiBiYWNrZHJvcC1ibHVyLW5vbmUgei01MCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgY3Vyc29yLWRlZmF1bHQgXCIgKyAocHJvcHMuaXNTaG93biA/IFwiYmFja2Ryb3AtYmx1ci1bNHB4XSBiZy1ncmF5LTUwMC8zMFwiIDogXCJiYWNrZHJvcC1ibHVyLW5vbmUgYmctdHJhbnNwYXJlbnQgaW52aXNpYmxlXCIpIH0gPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYmctd2hpdGUgcC00IHJvdW5kZWQtMnhsIHNoYWRvdy1oaWdoIFwiICsgKCFwcm9wcy5pc1Nob3duICYmIFwiaW52aXNpYmxlXCIpIH0gPlxuICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2J1dHRvbj5cbiAgICApXG59Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJjcmVhdGVQb3J0YWwiLCJNb2RhbENvbnRleHQiLCJ1c2VNb2RhbCIsIk1vZGFsUHJvdmlkZXIiLCJwcm9wcyIsImlzU2hvd24iLCJzZXRJc1Nob3duIiwiY29udGVudCIsInNldENvbnRlbnQiLCJQcm92aWRlciIsInZhbHVlIiwiTW9kYWwiLCJjaGlsZHJlbiIsImxvYWRlZCIsInNldExvYWRlZCIsImJ1dHRvbiIsIm9uQ2xpY2siLCJjbGFzc05hbWUiLCJkaXYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/ModalContext.js\n");

/***/ })

});